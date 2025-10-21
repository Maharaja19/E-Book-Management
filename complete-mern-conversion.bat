@echo off
REM Script to complete the MERN stack conversion

echo Completing MERN stack conversion...

REM Install updated dependencies
echo Installing updated dependencies...
cd server
npm install
cd ..

echo MERN stack conversion completed!
echo.
echo To run the application:
echo 1. Start Docker services: docker-compose up -d
echo 2. Install Ollama from https://ollama.ai
echo 3. Pull AI models: ollama pull mistral
echo 4. Access the web app at http://localhost:3000
echo.
pause