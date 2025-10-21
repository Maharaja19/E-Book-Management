@echo off
REM Script to migrate BookSphere to MERN stack

echo Migrating BookSphere to MERN stack...

REM Stop existing services
echo Stopping existing services...
docker-compose down

REM Backup original files
echo Backing up original files...
if not exist "backup" mkdir "backup"
copy "server\server.js" "backup\server.js.backup"
copy "server\services\aiService.js" "backup\aiService.js.backup"
copy "server\routes\ai.js" "backup\ai.js.backup"
copy "server\package.json" "backup\package.json.backup"
copy "docker-compose.yml" "backup\docker-compose.yml.backup"

REM Copy MERN files
echo Copying MERN files...
copy "server\mernServer.js" "server\server.js"
copy "server\services\mernAIService.js" "server\services\aiService.js"
copy "server\routes\mernAI.js" "server\routes\ai.js"
copy "server\package.json" "server\package.json"

REM Install dependencies
echo Installing updated dependencies...
cd server
npm install
cd ..

REM Start MERN services
echo Starting MERN services...
docker-compose -f docker-compose.mern.yml up -d

echo Migration to MERN stack complete!
echo.
echo Next steps:
echo 1. Install Ollama locally from https://ollama.ai
echo 2. Pull AI models: ollama pull mistral
echo 3. Access the application at http://localhost:3000
echo.
pause