#!/bin/bash

# XYResults Project Restart Script

# Display banner
echo "====================================="
echo "  Restarting XYResults Application"
echo "====================================="

# Execute stop script
echo "Stopping services..."
./scripts/stop.sh

# Wait a moment
echo "Waiting for services to stop completely..."
sleep 3

# Execute start script
echo "Starting services..."
./scripts/start.sh

echo ""
echo "====================================="
echo "  XYResults Application Restarted"
echo "====================================="