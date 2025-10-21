# BookSphere AI Engine

This directory contains the AI engine for BookSphere, which provides offline AI capabilities using local LLMs.

## Features

- Local LLM integration with Ollama
- Text summarization
- Flashcard generation
- Quiz creation
- Chat with book content
- Content analysis

## Requirements

- Python 3.8+
- Ollama (for local LLMs)
- Required Python packages (see requirements.txt)

## Setup

1. Install Ollama from https://ollama.ai
2. Pull a model: `ollama pull mistral`
3. Install Python dependencies: `pip install -r requirements.txt`
4. Run the server: `python app.py`

## API Endpoints

- POST /summarize - Generate a summary of text content
- POST /flashcards - Create flashcards from text content
- POST /quiz - Generate a quiz from text content
- POST /chat - Chat with the AI about book content
- POST /analyze - Analyze content for academic insights

## Models Supported

- Mistral 7B
- Llama 3
- Phi-3 Mini

## Configuration

The AI engine can be configured using environment variables:

- `OLLAMA_API_URL` - URL for the Ollama API (default: http://localhost:11434)
- `DEFAULT_MODEL` - Default model to use (default: mistral)
- `HOST` - Host to run the server on (default: 0.0.0.0)
- `PORT` - Port to run the server on (default: 8000)