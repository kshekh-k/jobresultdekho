#!/bin/bash

# XYResults Project Logs Script

# Display banner
echo "====================================="
echo "  XYResults Application Logs"
echo "====================================="

# Check if service name is provided
if [ -z "$1" ]; then
  echo "Usage: ./scripts/logs.sh [service_name]"
  echo ""
  echo "Available services:"
  docker-compose ps --services
  echo ""
  echo "To view all logs: ./scripts/logs.sh all"
  exit 1
fi

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running or not installed!"
  exit 1
fi

# View logs based on input
if [ "$1" = "all" ]; then
  echo "Showing logs for all services. Press Ctrl+C to exit."
  docker-compose logs -f
else
  echo "Showing logs for $1. Press Ctrl+C to exit."
  docker-compose logs -f "$1"
fi