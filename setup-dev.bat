@echo off
REM Development setup script for BookSphere

echo Setting up BookSphere development environment...

REM Create uploads directory for server
if not exist "server\uploads" mkdir "server\uploads"

REM Install server dependencies
echo Installing server dependencies...
cd server
npm install
cd ..

REM Install client dependencies
echo Installing client dependencies...
cd client
npm install
cd ..

REM Install mobile dependencies
echo Installing mobile dependencies...
cd mobile
npm install
cd ..

REM Install AI engine dependencies
echo Installing AI engine dependencies...
cd ai-engine
pip install -r requirements.txt
cd ..

echo Development environment setup complete!
echo.
echo To start the development servers:
echo 1. Start MongoDB (if not using Docker)
echo 2. Start Ollama and initialize models using init-ollama.bat
echo 3. Run "docker-compose up" to start all services
echo.
pause