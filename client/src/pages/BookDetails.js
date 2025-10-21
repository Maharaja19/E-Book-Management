import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBook } from '../features/books/bookSlice';
import { getProgress } from '../features/progress/progressSlice';
import './BookDetails.css';

const BookDetails = () => {
  const { id: bookId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { book } = useSelector((state) => state.books);
  const { progress } = useSelector((state) => state.progress);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (bookId) {
      dispatch(getBook(bookId));
      if (user) {
        dispatch(getProgress({ userId: user.id, bookId }));
      }
    }
  }, [bookId, user, dispatch]);

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-details">
      <div className="book-header">
        <img src={book.coverImage || '/placeholder-book.png'} alt={book.title} />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p className="author">by {book.author}</p>
          <p className="description">{book.description}</p>
          <div className="book-meta">
            <span className="meta-item">
              <strong>Genre:</strong> {book.genre}
            </span>
            <span className="meta-item">
              <strong>Pages:</strong> {book.pages}
            </span>
            <span className="meta-item">
              <strong>Language:</strong> {book.language}
            </span>
          </div>
          <div className="progress-info">
            {progress ? (
              <p>
                Progress: {progress.progressPercentage}% 
                {progress.isCompleted && ' (Completed)'}
              </p>
            ) : (
              <p>Not started yet</p>
            )}
          </div>
          <div className="book-actions">
            <Link to={`/book/${book._id}/read`} className="btn btn-primary">
              Read Book
            </Link>
            <button className="btn btn-secondary">
              Add to Group
            </button>
          </div>
        </div>
      </div>

      <div className="book-tabs">
        <button
          className={`tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`tab ${activeTab === 'ai-tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-tools')}
        >
          AI Tools
        </button>
        <button
          className={`tab ${activeTab === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'details' && (
          <div className="details-tab">
            <h2>Book Information</h2>
            <div className="detail-item">
              <strong>Publisher:</strong> {book.publisher || 'N/A'}
            </div>
            <div className="detail-item">
              <strong>Published Date:</strong> {book.publishDate ? new Date(book.publishDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="detail-item">
              <strong>ISBN:</strong> {book.isbn || 'N/A'}
            </div>
            <div className="detail-item">
              <strong>Tags:</strong> {book.tags?.join(', ') || 'None'}
            </div>
          </div>
        )}

        {activeTab === 'ai-tools' && (
          <div className="ai-tools-tab">
            <h2>AI-Powered Learning Tools</h2>
            <div className="ai-tools">
              <div className="ai-tool">
                <h3>📝 Summarize</h3>
                <p>Get a concise summary of this book</p>
                <button className="btn btn-primary">Generate Summary</button>
              </div>
              <div className="ai-tool">
                <h3>🗂️ Flashcards</h3>
                <p>Create flashcards for key concepts</p>
                <button className="btn btn-primary">Generate Flashcards</button>
              </div>
              <div className="ai-tool">
                <h3>❓ Quiz</h3>
                <p>Test your knowledge with AI-generated quizzes</p>
                <button className="btn btn-primary">Generate Quiz</button>
              </div>
              <div className="ai-tool">
                <h3>💬 Chat with Book</h3>
                <p>Ask questions about the book content</p>
                <button className="btn btn-primary">Start Chat</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="discussions-tab">
            <h2>Book Discussions</h2>
            <div className="discussion-form">
              <textarea placeholder="Start a discussion about this book..."></textarea>
              <button className="btn btn-primary">Post Discussion</button>
            </div>
            <div className="discussions-list">
              <div className="discussion-item">
                <h4>Chapter 3 Summary Discussion</h4>
                <p>What did you think about the main argument in chapter 3?</p>
                <div className="discussion-meta">
                  <span>Posted by John Doe</span>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="discussion-item">
                <h4>Key Themes</h4>
                <p>Can someone explain the symbolism in the second chapter?</p>
                <div className="discussion-meta">
                  <span>Posted by Jane Smith</span>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;