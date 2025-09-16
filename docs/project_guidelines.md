# XYResults Project Guidelines

## Overview

XYResults is a web application with a Svelte frontend and Strapi backend, all containerized using Docker. This document outlines the project structure, development practices, and guidelines for contributing to the project.

## Project Architecture

### Technology Stack

- **Frontend**: Svelte with TypeScript and Tailwind CSS
- **Backend**: Strapi 5 with Node.js API routing
- **Database**: PostgreSQL
- **Caching**: Redis and Varnish
- **Reverse Proxy**: Nginx
- **Containerization**: Docker and Docker Compose

### Directory Structure

```
xyresults/
├── .env                    # Centralized environment configuration
├── docker-compose.yml      # Docker Compose configuration for all services
├── frontend/               # Svelte frontend application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── Dockerfile          # Frontend container configuration
├── backend/                # Strapi backend application
│   ├── src/                # Source code
│   ├── config/             # Configuration files
│   └── Dockerfile          # Backend container configuration
├── nginx/                  # Nginx configuration
├── varnish/                # Varnish configuration
├── scripts/                # Utility scripts
│   ├── start.sh            # Start the application
│   ├── stop.sh             # Stop the application
│   ├── restart.sh          # Restart the application
│   └── logs.sh             # View application logs
└── docs/                   # Documentation
```

## Development Guidelines

### General Principles

1. **Single Source of Truth**: All configuration is centralized in the root `.env` file.
2. **Containerization**: All services are containerized using Docker.
3. **Separation of Concerns**: Each service has its own directory and configuration.
4. **Documentation**: All code should be well-documented.

### Code Style

#### Frontend (Svelte)

- Use TypeScript for all components
- Follow the Svelte style guide
- Use Tailwind CSS for styling
- Organize components by feature
- Use the Svelte store for state management

#### Backend (Strapi)

- Follow the Strapi development guidelines
- Use the Strapi Content-Type Builder for data modeling
- Implement custom controllers and services when needed
- Document all API endpoints

### Git Workflow

1. **Branching Strategy**:
   - `main`: Production-ready code
   - `develop`: Integration branch
   - `feature/*`: New features
   - `bugfix/*`: Bug fixes
   - `hotfix/*`: Urgent production fixes

2. **Commit Messages**:
   - Use conventional commit format: `type(scope): message`
   - Types: feat, fix, docs, style, refactor, test, chore
   - Example: `feat(categories): add parent-child relationship`

3. **Pull Requests**:
   - Create a pull request for each feature or fix
   - Require code review before merging
   - Ensure all tests pass
   - Update documentation as needed

## Deployment

### Development Environment

1. Clone the repository
2. Run `./scripts/start.sh`
3. Access the application at http://localhost:80

### Production Environment

1. Update the `.env` file with production values
2. Set `NODE_ENV=production` in the `.env` file
3. Run `./scripts/start.sh`
4. Configure a proper domain and SSL certificate

## Database Management

### PostgreSQL

- Database name: `xyresults`
- All services use the same database
- Backup the database regularly
- Use migrations for schema changes

### Data Model

#### Category Content Type

- `title`: String (required)
- `link`: String
- `parent`: Relation to another Category (many-to-one)
- `children`: Relation to other Categories (one-to-many)

## Monitoring and Maintenance

- Use Docker logs for troubleshooting
- Monitor resource usage
- Implement health checks
- Set up alerts for critical issues

## Security Guidelines

- Keep all passwords and secrets in the `.env` file
- Change default passwords in production
- Implement proper authentication and authorization
- Use HTTPS in production
- Regularly update dependencies

## Performance Optimization

- Use Redis for caching
- Configure Varnish for HTTP acceleration
- Optimize frontend assets
- Use proper database indexing
- Implement lazy loading for images and components