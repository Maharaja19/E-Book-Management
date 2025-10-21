# BookSphere - AI-Powered Group-Based Academic E-Book Management System

A full-stack web + mobile compatible e-book management application that combines the best of Kindle, Google Books, and collaborative academic reading platforms.

## 🔄 MERN Stack Version Available

This application is available in both the original multi-service architecture and a simplified MERN (MongoDB, Express.js, React, Node.js) stack version. See [MERN_CONVERSION.md](MERN_CONVERSION.md) for details on the MERN implementation.

## 🎯 Project Overview

BookSphere is a comprehensive academic e-book management system designed for students and educators. It enables collaborative reading through group-based access, integrates AI-powered learning tools, and provides detailed progress tracking.

## 🚀 Key Features

### 🔐 User Management
- Secure registration and authentication
- Role-based access (Admin/User)
- Institution verification

### 📚 Book Management
- Upload and manage academic books (PDF format)
- Metadata management (title, author, genre, etc.)
- Free and premium access models

### 👥 Group Collaboration
- Create/join reading groups (up to 4 members)
- Group-based premium book access
- Shared discussions and annotations

### 📖 Reading Experience
- In-app PDF reader (view-only mode)
- Bookmark and note-taking capabilities
- Progress tracking and statistics

### 🤖 AI-Powered Learning
- Offline text summarization
- Flashcard generation
- Quiz creation
- Chat with book content
- Content analysis

### 📊 Analytics & Insights
- Personal reading statistics
- Group leaderboards
- Admin dashboard

## 🛠 Technology Stack

### Frontend
- **Web**: React.js with Redux for state management
- **Mobile**: React Native (Expo)

### Backend
- **Server**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based authentication
- **File Storage**: Local storage (can be extended to AWS S3/Firebase)

### AI Engine
- **LLM Framework**: Ollama for local model inference
- **Supported Models**: Mistral 7B, Llama 3, Phi-3 Mini
- **API**: RESTful API for integration

### Deployment
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Nginx
- **Infrastructure**: Cloudflare-ready

## 📁 Project Structure

```
book-sphere/
├── client/              # React.js web frontend
│   ├── public/          # Static assets
│   ├── src/             # Source code
│   │   ├── app/         # Redux store
│   │   ├── components/  # Reusable components
│   │   ├── features/    # Redux slices
│   │   ├── pages/       # Page components
│   │   └── ...
│   ├── Dockerfile       # Web client Docker configuration
│   └── ...
├── mobile/              # React Native mobile app
│   ├── src/             # Source code
│   ├── App.js           # Main application component
│   ├── Dockerfile       # Mobile app Docker configuration
│   └── ...
├── server/              # Node.js + Express.js backend
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── validators/      # Input validation
│   ├── server.js        # Main server file
│   ├── Dockerfile       # Server Docker configuration
│   └── ...
├── ai-engine/           # Offline AI tools with Ollama
│   ├── app.py           # FastAPI application
│   ├── Dockerfile       # AI engine Docker configuration
│   └── ...
├── nginx/               # Nginx configuration
├── docker-compose.yml   # Docker orchestration
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Python 3.8+ (for AI engine development)
- Ollama (for local LLMs)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd book-sphere
   ```

2. **Start the services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the applications:**
   - Web Client: http://localhost:3000
   - API Server: http://localhost:5000
   - AI Engine: http://localhost:8000
   - MongoDB: mongodb://localhost:27017

### Development Setup

#### Backend (Node.js)
```bash
cd server
npm install
npm run dev
```

#### Web Client (React.js)
```bash
cd client
npm install
npm start
```

#### AI Engine (Python)
```bash
cd ai-engine
pip install -r requirements.txt
python app.py
```

#### Mobile App (React Native)
```bash
cd mobile
npm install
npm start
```

## 🧠 AI Integration

BookSphere uses Ollama to run large language models locally, providing:
- Summarization of book chapters
- Flashcard generation for key concepts
- Quiz creation for self-assessment
- Chat interface for asking questions about book content
- Content analysis for academic insights

To use the AI features:
1. Install Ollama from https://ollama.ai
2. Pull a model: `ollama pull mistral`
3. The AI engine will automatically connect to Ollama

## 📱 Mobile Application

The mobile application is built with React Native and Expo, providing:
- Cross-platform compatibility (iOS and Android)
- Offline reading capabilities
- Sync with web application
- Native mobile experience

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Secure API endpoints
- No PDF downloads (view-only mode)

## 📊 Analytics

The platform provides comprehensive analytics:
- Personal reading statistics
- Group progress tracking
- Leaderboards
- Admin dashboards
- Reading habit insights

## 🧪 Testing

- Unit tests with Jest
- Integration tests
- End-to-end tests

## 🚀 Deployment

The application is containerized with Docker and can be deployed to:
- AWS
- Google Cloud
- Azure
- DigitalOcean
- Railway
- Render

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Authors

BookSphere Team

## 🙏 Acknowledgments

- Ollama for local LLM inference
- All open-source libraries and tools used in this project