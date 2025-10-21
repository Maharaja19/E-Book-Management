@echo off
REM Script to initialize Ollama models for BookSphere AI Engine

echo Initializing Ollama models for BookSphere...

REM Check if Ollama is installed
where ollama >nul 2>&1
if %errorlevel% neq 0 (
    echo Ollama is not installed. Please install it from https://ollama.ai
    exit /b 1
)

REM Pull recommended models
echo Pulling Mistral 7B model...
ollama pull mistral

echo Pulling Llama 3 model...
ollama pull llama3

echo Pulling Phi-3 Mini model...
ollama pull phi3

echo All models have been downloaded successfully!

REM List available models
echo Available models:
ollama list

pause