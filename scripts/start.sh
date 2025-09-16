#!/bin/bash

# XYResults Project Start Script

# Display banner
echo "====================================="
echo "  Starting XYResults Application"
echo "====================================="

# Load environment variables
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found!"
  exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running or not installed!"
  echo "Please start Docker and try again."
  exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose > /dev/null 2>&1; then
  echo "Error: docker-compose is not installed!"
  echo "Please install docker-compose and try again."
  exit 1
fi

# Start the application
echo "Starting all services..."
docker-compose up -d

# Check if services are running
echo "Checking service status..."
sleep 5
docker-compose ps

echo ""
echo "====================================="
echo "  XYResults Application Started"
echo "====================================="
echo ""
echo "Access the application at:"
echo "- Frontend: http://localhost:${NGINX_PORT}"
echo "- Strapi Admin: http://localhost:${NGINX_PORT}/admin"
echo "- API: http://localhost:${NGINX_PORT}/api"
echo ""
echo "To stop the application, run: ./scripts/stop.sh"
echo "====================================="