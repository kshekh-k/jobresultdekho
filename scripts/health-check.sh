#!/bin/bash

# XYResults Health Check Script

# Display banner
echo "====================================="
echo "  XYResults Health Check"
echo "====================================="

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found!"
  exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running or not installed!"
  exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose > /dev/null 2>&1; then
  echo "Error: docker-compose is not installed!"
  exit 1
fi

# Function to check service status
check_service() {
  local service=$1
  local status=$(docker-compose ps -q $service 2>/dev/null)
  
  if [ -z "$status" ]; then
    echo "âŒ $service: Not running"
    return 1
  else
    local health=$(docker inspect --format='{{.State.Health.Status}}' $status 2>/dev/null)
    
    if [ -z "$health" ] || [ "$health" = "<nil>" ]; then
      echo "âœ… $service: Running"
      return 0
    elif [ "$health" = "healthy" ]; then
      echo "âœ… $service: Healthy"
      return 0
    else
      echo "âš ï¸ $service: $health"
      return 1
    fi
  fi
}

# Check all services
echo ""
echo "Checking service status..."
echo ""

services=("postgres" "redis" "strapi" "varnish" "nginx" "frontend")
failed=0

for service in "${services[@]}"; do
  check_service $service || ((failed++))
done

# Check connectivity
echo ""
echo "Checking connectivity..."
echo ""

# Check Nginx
echo -n "Testing Nginx: "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:${NGINX_PORT} | grep -q "200\|301\|302"; then
  echo "âœ… OK"
else
  echo "âŒ Failed"
  ((failed++))
fi

# Check Strapi API
echo -n "Testing Strapi API: "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:${NGINX_PORT}/api | grep -q "200\|401"; then
  echo "âœ… OK"
else
  echo "âŒ Failed"
  ((failed++))
fi

# Check PostgreSQL connection
echo -n "Testing PostgreSQL connection: "
if docker-compose exec -T postgres pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB} > /dev/null 2>&1; then
  echo "âœ… OK"
else
  echo "âŒ Failed"
  ((failed++))
fi

# Check Redis connection
echo -n "Testing Redis connection: "
if docker-compose exec -T redis redis-cli -a ${REDIS_PASSWORD} PING | grep -q "PONG"; then
  echo "âœ… OK"
else
  echo "âŒ Failed"
  ((failed++))
fi

# Summary
echo ""
echo "====================================="
if [ $failed -eq 0 ]; then
  echo "âœ… All systems operational"
else
  echo "âš ï¸ $failed issues detected"
fi
echo "====================================="

exit $failed