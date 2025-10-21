const axios = require('axios');

class AIService {
  constructor() {
    // Default to Ollama endpoint, but can be configured
    this.ollamaApiUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    this.defaultModel = process.env.OLLAMA_MODEL || 'mistral';
  }

  /**
   * Generate a summary of text content using Ollama
   * @param {string} content - Text content to summarize
   * @param {string} model - Model to use for summarization
   * @returns {Promise<string>} - Summary of the content
   */
  async summarize(content, model = this.defaultModel) {
    try {
      // For very long content, we might need to chunk it
      const prompt = `Summarize the following academic text in a clear and concise manner. 
                     Focus on key points, main arguments, and important findings. 
                     Keep the summary under 200 words.
                     
                     Text: ${content.substring(0, 5000)}`;
      
      const response = await axios.post(`${this.ollamaApiUrl}/api/generate`, {
        model: model,
        prompt: prompt,
        stream: false
      });
      
      return response.data.response;
    } catch (error) {
      console.error('Error generating summary:', error.message);
      throw new Error('Failed to generate summary');
    }
  }

  /**
   * Generate flashcards from text content
   * @param {string} content - Text content to create flashcards from
   * @param {string} model - Model to use for flashcard generation
   * @returns {Promise<Array>} - Array of flashcard objects with question and answer
   */
  async generateFlashcards(content, model = this.defaultModel) {
    try {
      const prompt = `Create exactly 10 flashcards from the following academic text.
                     Each flashcard should have a "question" and "answer" field.
                     Format the response as a JSON array of objects.
                     Focus on key concepts, definitions, and important facts.
                     
                     Text: ${content.substring(0, 3000)}`;
      
      const response = await axios.post(`${this.ollamaApiUrl}/api/generate`, {
        model: model,
        prompt: prompt,
        stream: false,
        format: 'json'
      });
      
      // Attempt to parse the response as JSON
      try {
        const flashcards = JSON.parse(response.data.response);
        return flashcards.slice(0, 10); // Ensure we return max 10 flashcards
      } catch (parseError) {
        // If parsing fails, create a fallback response
        console.error('Error parsing flashcards:', parseError.message);
        return [
          {
            question: "Summarize the main points of the text",
            answer: content.substring(0, 200) + "..."
          }
        ];
      }
    } catch (error) {
      console.error('Error generating flashcards:', error.message);
      throw new Error('Failed to generate flashcards');
    }
  }

  /**
   * Generate a quiz from text content
   * @param {string} content - Text content to create quiz from
   * @param {number} numQuestions - Number of questions to generate (default: 5)
   * @param {string} model - Model to use for quiz generation
   * @returns {Promise<Array>} - Array of quiz question objects
   */
  async generateQuiz(content, numQuestions = 5, model = this.defaultModel) {
    try {
      const prompt = `Create a quiz with ${numQuestions} multiple-choice questions from the following academic text.
                     Each question should have:
                     - "question" (the question text)
                     - "options" (array of 4 options)
                     - "correctAnswer" (the correct answer text)
                     - "explanation" (explanation of the correct answer)
                     Format the response as a JSON array of objects.
                     
                     Text: ${content.substring(0, 4000)}`;
      
      const response = await axios.post(`${this.ollamaApiUrl}/api/generate`, {
        model: model,
        prompt: prompt,
        stream: false,
        format: 'json'
      });
      
      // Attempt to parse the response as JSON
      try {
        const quiz = JSON.parse(response.data.response);
        return quiz.slice(0, numQuestions); // Ensure we return the requested number of questions
      } catch (parseError) {
        // If parsing fails, create a fallback response
        console.error('Error parsing quiz:', parseError.message);
        return [
          {
            question: "What is the main topic of the text?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
            explanation: "This is a sample question based on the provided text."
          }
        ];
      }
    } catch (error) {
      console.error('Error generating quiz:', error.message);
      throw new Error('Failed to generate quiz');
    }
  }

  /**
   * Chat with the AI about book content
   * @param {string} content - Book content to reference
   * @param {string} question - User's question
   * @param {string} model - Model to use for chat
   * @returns {Promise<string>} - AI's response to the question
   */
  async chatWithBook(content, question, model = this.defaultModel) {
    try {
      const prompt = `You are an expert academic assistant helping a student understand a textbook.
                     Answer the following question based on the provided text.
                     Be concise but thorough in your explanation.
                     
                     Text: ${content.substring(0, 3000)}
                     
                     Question: ${question}`;
      
      const response = await axios.post(`${this.ollamaApiUrl}/api/generate`, {
        model: model,
        prompt: prompt,
        stream: false
      });
      
      return response.data.response;
    } catch (error) {
      console.error('Error in chat:', error.message);
      throw new Error('Failed to get response from AI');
    }
  }

  /**
   * Analyze text content for academic insights
   * @param {string} content - Text content to analyze
   * @param {string} model - Model to use for analysis
   * @returns {Promise<object>} - Analysis results
   */
  async analyzeContent(content, model = this.defaultModel) {
    try {
      const prompt = `Analyze the following academic text and provide insights in JSON format with:
                     - "keyTopics": array of main topics discussed
                     - "difficultyLevel": difficulty level (beginner/intermediate/advanced)
                     - "estimatedReadingTime": estimated time in minutes
                     - "keyTerms": array of important academic terms
                     - "summary": brief summary of content
                     
                     Text: ${content.substring(0, 3000)}`;
      
      const response = await axios.post(`${this.ollamaApiUrl}/api/generate`, {
        model: model,
        prompt: prompt,
        stream: false,
        format: 'json'
      });
      
      // Attempt to parse the response as JSON
      try {
        return JSON.parse(response.data.response);
      } catch (parseError) {
        // If parsing fails, create a fallback response
        console.error('Error parsing analysis:', parseError.message);
        return {
          keyTopics: ["Academic Content"],
          difficultyLevel: "intermediate",
          estimatedReadingTime: Math.ceil(content.length / 1000),
          keyTerms: [],
          summary: content.substring(0, 200) + "..."
        };
      }
    } catch (error) {
      console.error('Error analyzing content:', error.message);
      throw new Error('Failed to analyze content');
    }
  }

  /**
   * Recommend related topics or books for continued learning
   * @param {string} content - Book content to analyze for recommendations
   * @param {string} model - Model to use for recommendations
   * @returns {Promise<Array>} - Array of recommended topics/books
   */
  async recommendReadingPath(content, model = this.defaultModel) {
    try {
      const prompt = `Based on the following academic text, recommend 5 related topics or books for continued learning.
                     Provide recommendations in JSON format as an array of objects, each with:
                     - "title": title of the recommended book or topic
                     - "author": author (if applicable)
                     - "description": brief description of why this is recommended
                     - "category": category of the recommendation (e.g., "related topic", "advanced study", "prerequisite")
                     
                     Text: ${content.substring(0, 3000)}`;
      
      const response = await axios.post(`${this.ollamaApiUrl}/api/generate`, {
        model: model,
        prompt: prompt,
        stream: false,
        format: 'json'
      });
      
      // Attempt to parse the response as JSON
      try {
        const recommendations = JSON.parse(response.data.response);
        return recommendations.slice(0, 5); // Ensure we return max 5 recommendations
      } catch (parseError) {
        // If parsing fails, create a fallback response
        console.error('Error parsing recommendations:', parseError.message);
        return [
          {
            title: "Related Academic Topics",
            author: "AI Recommendation System",
            description: "Explore related topics in this field for deeper understanding",
            category: "related topic"
          }
        ];
      }
    } catch (error) {
      console.error('Error generating recommendations:', error.message);
      throw new Error('Failed to generate reading recommendations');
    }
  }
}

module.exports = new AIService();