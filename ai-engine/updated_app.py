import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="BookSphere AI Engine",
    description="AI-powered learning tools for BookSphere e-book platform",
    version="1.0.0"
)

# Configuration
OLLAMA_API_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "mistral")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))

# Initialize Ollama client
client = ollama.Client(host=OLLAMA_API_URL)

# Request models
class SummarizeRequest(BaseModel):
    content: str
    model: str = DEFAULT_MODEL

class FlashcardsRequest(BaseModel):
    content: str
    model: str = DEFAULT_MODEL

class QuizRequest(BaseModel):
    content: str
    num_questions: int = 5
    model: str = DEFAULT_MODEL

class ChatRequest(BaseModel):
    content: str
    question: str
    model: str = DEFAULT_MODEL

class AnalyzeRequest(BaseModel):
    content: str
    model: str = DEFAULT_MODEL

class RecommendRequest(BaseModel):
    content: str
    model: str = DEFAULT_MODEL

# Helper function to truncate content if too long
def truncate_content(content: str, max_length: int = 5000) -> str:
    if len(content) > max_length:
        return content[:max_length] + "..."
    return content

# Summarize endpoint
@app.post("/summarize")
async def summarize(request: SummarizeRequest):
    try:
        # Truncate content if too long
        content = truncate_content(request.content)
        
        prompt = f"""Summarize the following academic text in a clear and concise manner. 
                     Focus on key points, main arguments, and important findings. 
                     Keep the summary under 200 words.
                     
                     Text: {content}"""
        
        response = client.generate(
            model=request.model,
            prompt=prompt,
            stream=False
        )
        
        return {"summary": response["response"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")

# Flashcards endpoint
@app.post("/flashcards")
async def generate_flashcards(request: FlashcardsRequest):
    try:
        # Truncate content if too long
        content = truncate_content(request.content, 3000)
        
        prompt = f"""Create exactly 10 flashcards from the following academic text.
                     Each flashcard should have a "question" and "answer" field.
                     Format the response as a JSON array of objects.
                     Focus on key concepts, definitions, and important facts.
                     
                     Text: {content}"""
        
        response = client.generate(
            model=request.model,
            prompt=prompt,
            stream=False,
            format="json"
        )
        
        # Attempt to parse the response as JSON
        try:
            flashcards = json.loads(response["response"])
            # Ensure we return max 10 flashcards
            return {"flashcards": flashcards[:10]}
        except json.JSONDecodeError:
            # If parsing fails, create a fallback response
            return {
                "flashcards": [
                    {
                        "question": "Summarize the main points of the text",
                        "answer": content[:200] + "..."
                    }
                ]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating flashcards: {str(e)}")

# Quiz endpoint
@app.post("/quiz")
async def generate_quiz(request: QuizRequest):
    try:
        # Truncate content if too long
        content = truncate_content(request.content, 4000)
        
        prompt = f"""Create a quiz with {request.num_questions} multiple-choice questions from the following academic text.
                     Each question should have:
                     - "question" (the question text)
                     - "options" (array of 4 options)
                     - "correctAnswer" (the correct answer text)
                     - "explanation" (explanation of the correct answer)
                     Format the response as a JSON array of objects.
                     
                     Text: {content}"""
        
        response = client.generate(
            model=request.model,
            prompt=prompt,
            stream=False,
            format="json"
        )
        
        # Attempt to parse the response as JSON
        try:
            quiz = json.loads(response["response"])
            # Ensure we return the requested number of questions
            return {"quiz": quiz[:request.num_questions]}
        except json.JSONDecodeError:
            # If parsing fails, create a fallback response
            return {
                "quiz": [
                    {
                        "question": "What is the main topic of the text?",
                        "options": ["Option A", "Option B", "Option C", "Option D"],
                        "correctAnswer": "Option A",
                        "explanation": "This is a sample question based on the provided text."
                    }
                ]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

# Chat endpoint
@app.post("/chat")
async def chat_with_book(request: ChatRequest):
    try:
        # Truncate content if too long
        content = truncate_content(request.content, 3000)
        
        prompt = f"""You are an expert academic assistant helping a student understand a textbook.
                     Answer the following question based on the provided text.
                     Be concise but thorough in your explanation.
                     
                     Text: {content}
                     
                     Question: {request.question}"""
        
        response = client.generate(
            model=request.model,
            prompt=prompt,
            stream=False
        )
        
        return {"response": response["response"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in chat: {str(e)}")

# Analyze endpoint
@app.post("/analyze")
async def analyze_content(request: AnalyzeRequest):
    try:
        # Truncate content if too long
        content = truncate_content(request.content, 3000)
        
        prompt = f"""Analyze the following academic text and provide insights in JSON format with:
                     - "keyTopics": array of main topics discussed
                     - "difficultyLevel": difficulty level (beginner/intermediate/advanced)
                     - "estimatedReadingTime": estimated time in minutes
                     - "keyTerms": array of important academic terms
                     - "summary": brief summary of content
                     
                     Text: {content}"""
        
        response = client.generate(
            model=request.model,
            prompt=prompt,
            stream=False,
            format="json"
        )
        
        # Attempt to parse the response as JSON
        try:
            analysis = json.loads(response["response"])
            return {"analysis": analysis}
        except json.JSONDecodeError:
            # If parsing fails, create a fallback response
            return {
                "analysis": {
                    "keyTopics": ["Academic Content"],
                    "difficultyLevel": "intermediate",
                    "estimatedReadingTime": len(content) // 1000,
                    "keyTerms": [],
                    "summary": content[:200] + "..."
                }
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing content: {str(e)}")

# Recommend endpoint
@app.post("/recommend")
async def recommend_reading_path(request: RecommendRequest):
    try:
        # Truncate content if too long
        content = truncate_content(request.content, 3000)
        
        prompt = f"""Based on the following academic text, recommend 5 related topics or books for continued learning.
                     Provide recommendations in JSON format as an array of objects, each with:
                     - "title": title of the recommended book or topic
                     - "author": author (if applicable)
                     - "description": brief description of why this is recommended
                     - "category": category of the recommendation (e.g., "related topic", "advanced study", "prerequisite")
                     
                     Text: {content}"""
        
        response = client.generate(
            model=request.model,
            prompt=prompt,
            stream=False,
            format="json"
        )
        
        # Attempt to parse the response as JSON
        try:
            recommendations = json.loads(response["response"])
            # Ensure we return max 5 recommendations
            return {"recommendations": recommendations[:5]}
        except json.JSONDecodeError:
            # If parsing fails, create a fallback response
            return {
                "recommendations": [
                    {
                        "title": "Related Academic Topics",
                        "author": "AI Recommendation System",
                        "description": "Explore related topics in this field for deeper understanding",
                        "category": "related topic"
                    }
                ]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "OK", "message": "BookSphere AI Engine is running"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to BookSphere AI Engine",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)