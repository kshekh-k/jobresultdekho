#!/bin/bash

# XYResults Project Stop Script

# Display banner
echo "====================================="
echo "  Stopping XYResults Application"
echo "====================================="

# Load environment variables
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
else
  echo "Warning: .env file not found. Continuing anyway..."
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

# Stop the application
echo "Stopping all services..."
docker-compose down

# Check if any containers are still running
if [ "$(docker ps --filter name=${COMPOSE_PROJECT_NAME} -q)" ]; then
  echo "Warning: Some containers are still running. Forcing stop..."
  docker-compose down --remove-orphans
fi

echo ""
echo "====================================="
echo "  XYResults Application Stopped"
echo "====================================="