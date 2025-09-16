# XYResults Setup Guide

This guide provides step-by-step instructions for setting up the XYResults application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker Engine (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd xyresults
```

### 2. Configure Environment Variables

The application uses a centralized `.env` file for all configuration. Review and modify the `.env` file as needed:

```bash
# Open the .env file in your preferred editor
nano .env
```

Important variables to review:

- Database credentials (`POSTGRES_USER`, `POSTGRES_PASSWORD`)
- Strapi secrets (`STRAPI_ADMIN_JWT_SECRET`, `STRAPI_JWT_SECRET`, `STRAPI_APP_KEYS`)
- Strapi salt (`STRAPI_TOKEN_SALT`, `STRAPI_API_TOKEN_SALT`)
- Redis password (`REDIS_PASSWORD`)
- Port configurations if you need to change from defaults

### 3. Start the Application

Use the provided start script:

```bash
# Make the script executable if needed
chmod +x scripts/start.sh

# Start the application
./scripts/start.sh
```

This will:
- Load environment variables
- Start all Docker containers
- Display access URLs when complete

### 4. Access the Application

Once the application is running, you can access:

- Frontend: http://localhost:80
- Strapi Admin: http://localhost:80/admin
- API: http://localhost:80/api

### 5. First-time Strapi Setup

When accessing the Strapi admin panel for the first time:

1. Create an admin user
2. Log in to the admin panel
3. Navigate to Content-Types Builder to see the Category structure
4. Add some test categories if needed (sample data should be automatically seeded in development mode)

## Managing the Application

### Stopping the Application

```bash
./scripts/stop.sh
```

### Restarting the Application

```bash
./scripts/restart.sh
```

### Viewing Logs

To view logs for all services:

```bash
./scripts/logs.sh all
```

To view logs for a specific service:

```bash
./scripts/logs.sh <service_name>
```

Available services: postgres, strapi, redis, varnish, nginx, frontend

### Accessing the Database

To access the PostgreSQL database directly:

```bash
docker-compose exec postgres psql -U xyresults_user -d xyresults
```

## Troubleshooting

### Container Startup Issues

If containers fail to start:

1. Check logs for the specific service:
   ```bash
   ./scripts/logs.sh <service_name>
   ```

2. Verify environment variables in the `.env` file

3. Ensure ports are not already in use on your system

### Database Connection Issues

If Strapi cannot connect to the database:

1. Check database logs:
   ```bash
   ./scripts/logs.sh postgres
   ```

2. Verify database credentials in the `.env` file

3. Ensure the postgres container is running:
   ```bash
   docker-compose ps postgres
   ```

### Frontend Not Loading

If the frontend doesn't load properly:

1. Check frontend logs:
   ```bash
   ./scripts/logs.sh frontend
   ```

2. Verify the API URL in the `.env` file (`VITE_API_URL`)

3. Ensure the frontend container built successfully

### Cache Issues

If you're experiencing caching issues:

1. Restart the Varnish service:
   ```bash
   docker-compose restart varnish
   ```

2. Clear Redis cache:
   ```bash
   docker-compose exec redis redis-cli -a $REDIS_PASSWORD FLUSHALL
   ```

## Development Workflow

### Frontend Development

For active frontend development:

1. Stop the frontend container:
   ```bash
   docker-compose stop frontend
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the frontend at http://localhost:3000

### Backend Development

For active backend development:

1. Stop the strapi container:
   ```bash
   docker-compose stop strapi
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run develop
   ```

5. Access the Strapi admin at http://localhost:1337/admin

## Updating the Application

To update the application:

1. Pull the latest changes:
   ```bash
   git pull
   ```

2. Rebuild the containers:
   ```bash
   docker-compose build
   ```

3. Restart the application:
   ```bash
   ./scripts/restart.sh
   ```

## Backup and Restore

### Database Backup

To backup the PostgreSQL database:

```bash
docker-compose exec postgres pg_dump -U xyresults_user -d xyresults > backup_$(date +%Y%m%d).sql
```

### Database Restore

To restore from a backup:

```bash
cat backup_file.sql | docker-compose exec -T postgres psql -U xyresults_user -d xyresults
```