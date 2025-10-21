#!/bin/bash

# Script to migrate BookSphere to MERN stack

echo "Migrating BookSphere to MERN stack..."

# Stop existing services
echo "Stopping existing services..."
docker-compose down

# Backup original files
echo "Backing up original files..."
mkdir -p backup
cp server/server.js backup/server.js.backup
cp server/services/aiService.js backup/aiService.js.backup
cp server/routes/ai.js backup/ai.js.backup
cp server/package.json backup/package.json.backup
cp docker-compose.yml backup/docker-compose.yml.backup

# Copy MERN files
echo "Copying MERN files..."
cp server/mernServer.js server/server.js
cp server/services/mernAIService.js server/services/aiService.js
cp server/routes/mernAI.js server/routes/ai.js
cp server/package.json server/package.json

# Install dependencies
echo "Installing updated dependencies..."
cd server
npm install
cd ..

# Start MERN services
echo "Starting MERN services..."
docker-compose -f docker-compose.mern.yml up -d

echo "Migration to MERN stack complete!"
echo ""
echo "Next steps:"
echo "1. Install Ollama locally from https://ollama.ai"
echo "2. Pull AI models: ollama pull mistral"
echo "3. Access the application at http://localhost:3000"