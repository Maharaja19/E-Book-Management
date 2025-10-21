#!/bin/bash

# Script to initialize Ollama models for BookSphere AI Engine

echo "Initializing Ollama models for BookSphere..."

# Check if Ollama is installed
if ! command -v ollama &> /dev/null
then
    echo "Ollama is not installed. Please install it from https://ollama.ai"
    exit 1
fi

# Pull recommended models
echo "Pulling Mistral 7B model..."
ollama pull mistral

echo "Pulling Llama 3 model..."
ollama pull llama3

echo "Pulling Phi-3 Mini model..."
ollama pull phi3

echo "All models have been downloaded successfully!"

# List available models
echo "Available models:"
ollama list