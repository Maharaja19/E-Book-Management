# Running BookSphere Application

This document provides detailed instructions for running the BookSphere application in different environments.

## Prerequisites

Before running BookSphere, ensure you have the following installed:

1. **Docker** - [Download Docker](https://www.docker.com/products/docker-desktop)
2. **Docker Compose** - Usually included with Docker Desktop
3. **Git** - [Download Git](https://git-scm.com/downloads)
4. **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
5. **Python** (v3.8 or higher) - [Download Python](https://www.python.org/downloads/)
6. **Ollama** - [Download Ollama](https://ollama.ai/)

## Quick Start with Docker (Recommended)

The easiest way to run BookSphere is using Docker Compose, which will set up all services automatically.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd book-sphere
```

### 2. Start All Services
```bash
docker-compose up -d
```

This command will:
- Start MongoDB database
- Start the Node.js backend server
- Start the React.js web frontend
- Start the Python AI engine
- Start the React Native mobile app container
- Start Nginx reverse proxy

### 3. Access the Application
- **Web Application**: http://localhost
- **API Server**: http://localhost/api
- **AI Engine**: http://localhost/ai
- **MongoDB**: mongodb://localhost:27017

### 4. Initialize AI Models (First Time Only)
After starting the services, you need to initialize the AI models:

1. Open a terminal inside the Ollama container:
   ```bash
   docker exec -it ollama bash
   ```

2. Pull the required models:
   ```bash
   ollama pull mistral
   ollama pull llama3
   ollama pull phi3
   ```

Alternatively, if Ollama is installed on your host machine:
```bash
./init-ollama.bat  # Windows
# or
./init-ollama.sh   # macOS/Linux
```

## Development Setup

For development work, you may want to run services separately.

### 1. Start MongoDB
If using Docker for MongoDB only:
```bash
docker-compose up -d mongodb
```

Or install MongoDB locally and start the service.

### 2. Start Ollama and Initialize Models
```bash
# Start Ollama service (varies by OS)
# On Windows/macOS, Ollama runs as a background service after installation

# Initialize models
./init-ollama.bat
```

### 3. Start Backend Server
```bash
cd server
npm install
npm run dev
```

The server will be available at http://localhost:5000

### 4. Start Web Frontend
```bash
cd client
npm install
npm start
```

The web application will be available at http://localhost:3000

### 5. Start AI Engine
```bash
cd ai-engine
pip install -r requirements.txt
python app.py
```

The AI engine will be available at http://localhost:8000

### 6. Start Mobile App (Optional)
```bash
cd mobile
npm install
npm start
```

Follow the Expo instructions to run on iOS/Android simulator or device.

## Environment Variables

Each service uses environment variables for configuration. Default values are provided, but you can customize them:

### Server (.env in /server)
```bash
PORT=5000
NODE_ENV=development
DB_URI=mongodb://admin:password@localhost:27017/book_sphere?authSource=admin
JWT_SECRET=your_jwt_secret_here
OLLAMA_API_URL=http://localhost:8000
```

### Client (.env in /client)
```bash
REACT_APP_API_URL=http://localhost:5000
```

### AI Engine (Environment variables)
```bash
OLLAMA_API_URL=http://localhost:11434
DEFAULT_MODEL=mistral
HOST=0.0.0.0
PORT=8000
```

## Data Management

### MongoDB Data Persistence
Data is persisted in Docker volumes. To reset the database:
```bash
docker-compose down -v
docker-compose up -d
```

### Initial Data Setup
To populate the database with sample data, you can create a script or use the API endpoints to add:
1. Admin user
2. Sample books
3. Test groups

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Ensure ports 80, 443, 5000, 3000, 8000, 27017 are not in use
   - Modify docker-compose.yml to use different ports if needed

2. **Docker Permission Issues**
   - Run Docker Desktop as administrator on Windows
   - Add your user to the docker group on Linux

3. **AI Model Loading Issues**
   - Ensure Ollama is running
   - Check that models are properly downloaded
   - Verify OLLAMA_API_URL configuration

4. **Connection Issues**
   - Check that all services are running: `docker-compose ps`
   - Verify network connectivity between containers

### Logs and Monitoring

View logs for specific services:
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs server
docker-compose logs client
docker-compose logs ai-engine
```

### Stopping Services

To stop all services:
```bash
docker-compose down
```

To stop specific services:
```bash
docker-compose stop server
```

## Production Deployment

For production deployment, consider the following:

1. **Use Production-Ready Images**
   - Build optimized Docker images
   - Use multi-stage builds

2. **Security Hardening**
   - Use HTTPS with SSL certificates
   - Set strong passwords and secrets
   - Implement proper firewall rules

3. **Performance Optimization**
   - Use reverse proxy caching
   - Optimize database indexes
   - Implement load balancing

4. **Monitoring and Logging**
   - Implement centralized logging
   - Set up application monitoring
   - Configure health checks

5. **Backup and Recovery**
   - Implement regular database backups
   - Set up disaster recovery procedures

## Support

For issues or questions:
1. Check the [Project Summary](PROJECT_SUMMARY.md)
2. Review the documentation in each component directory
3. Submit issues to the project repository