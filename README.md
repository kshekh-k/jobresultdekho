# XYResults Project

A centralized Docker setup for XYResults with a Svelte frontend and Strapi backend.

## Architecture

- **Frontend**: Svelte with TypeScript and Tailwind CSS
- **Backend**: Strapi 5 with Node.js API routing
- **Database**: PostgreSQL
- **Caching**: Redis and Varnish
- **Reverse Proxy**: Nginx

## Key Features

1. **Centralized Configuration**: Root `.env` file for all configuration
2. **Unified Container Management**: Root `docker-compose.yml` for all services
3. **Single Database**: All services use the same PostgreSQL database named "xyresults"
4. **Hierarchical Categories**: Strapi category content type with parent-child relationships
5. **Frontend Integration**: Example implementation to render categories in the frontend
6. **Utility Scripts**: Easy-to-use scripts for managing the application
7. **Comprehensive Documentation**: Detailed guides and architecture documentation

## Quick Start

### Prerequisites

- Docker and Docker Compose installed on your system
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd xyresults
   ```

2. Start the application:
   ```bash
   ./scripts/start.sh
   ```

3. Access the services:
   - Frontend: http://localhost:80
   - Strapi Admin: http://localhost:80/admin
   - API: http://localhost:80/api

## Managing the Application

The project includes several utility scripts to make management easier:

- **Start**: `./scripts/start.sh` - Start all services
- **Stop**: `./scripts/stop.sh` - Stop all services
- **Restart**: `./scripts/restart.sh` - Restart all services
- **Logs**: `./scripts/logs.sh [service_name]` - View logs for a specific service or all services

## Project Structure

```
xyresults/
├── .env                    # Centralized environment configuration
├── docker-compose.yml      # Docker Compose configuration for all services
├── frontend/               # Svelte frontend application
├── backend/                # Strapi backend application
├── nginx/                  # Nginx configuration
├── varnish/                # Varnish configuration
├── scripts/                # Utility scripts
│   ├── start.sh            # Start the application
│   ├── stop.sh             # Stop the application
│   ├── restart.sh          # Restart the application
│   └── logs.sh             # View application logs
└── docs/                   # Documentation
    ├── project_guidelines.md    # Development guidelines
    ├── technical_architecture.md # System architecture details
    └── setup_guide.md      # Detailed setup instructions
```

## Development

### Frontend Development

The frontend is built with Svelte, TypeScript, and Tailwind CSS. To develop the frontend:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

### Backend Development

The backend is built with Strapi 5. To develop the backend:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn develop
   yarn develop --no-watch-admin
   ```

4. Generate STRAPI_API_TOKEN_SALT & STRAPI_TOKEN_SALT and configure backend/.env
   ```bash
   node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
   ```

5. Generate STRAPI_APP_KEYS & configure backend/.env
   ```bash
   node -e "console.log([require('crypto').randomBytes(32).toString('hex'), require('crypto').randomBytes(32).toString('hex')])"
   ```
5. To resolve frontend "upgrade required" error
   ```bash
   cd frontend
   yarn dev --host 0.0.0.0 --port 5173
   ```

## Category Content Type

The Strapi backend includes a Category content type with the following fields:

- `title`: String (required)
- `link`: String
- `parent`: Relation to another Category (many-to-one)
- `children`: Relation to other Categories (one-to-many)

This allows for creating hierarchical category structures with parent-child relationships.

## Documentation

For more detailed information, please refer to the documentation in the `docs` directory:

- [Project Guidelines](docs/project_guidelines.md) - Development standards and practices
- [Technical Architecture](docs/technical_architecture.md) - System architecture and data flow
- [Setup Guide](docs/setup_guide.md) - Detailed installation and configuration instructions

## License

[MIT License](LICENSE)