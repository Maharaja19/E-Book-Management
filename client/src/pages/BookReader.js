import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBook } from '../features/books/bookSlice';
import { getProgress, updateProgress } from '../features/progress/progressSlice';
import './BookReader.css';

const BookReader = () => {
  const { id: bookId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { book } = useSelector((state) => state.books);
  const { progress } = useSelector((state) => state.progress);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (bookId) {
      dispatch(getBook(bookId));
      if (user) {
        dispatch(getProgress({ userId: user.id, bookId }));
      }
    }
  }, [bookId, user, dispatch]);

  useEffect(() => {
    if (progress) {
      setCurrentPage(progress.currentPage || 1);
      setBookmarks(progress.bookmarks || []);
      setNotes(progress.notes || []);
    }
  }, [progress]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (book?.pages || 1)) {
      setCurrentPage(newPage);
      
      // Update progress
      if (user) {
        dispatch(updateProgress({
          userId: user.id,
          bookId,
          currentPage: newPage,
          totalPages: book?.pages
        }));
      }
    }
  };

  const addBookmark = () => {
    const newBookmark = {
      page: currentPage,
      content: `Bookmark at page ${currentPage}`
    };
    
    setBookmarks([...bookmarks, newBookmark]);
    
    // In a real app, you would save this to the backend
    console.log('Bookmark added:', newBookmark);
  };

  const addNote = () => {
    const noteContent = prompt('Enter your note:');
    if (noteContent) {
      const newNote = {
        page: currentPage,
        content: noteContent
      };
      
      setNotes([...notes, newNote]);
      
      // In a real app, you would save this to the backend
      console.log('Note added:', newNote);
    }
  };

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-reader">
      {/* Reader Header */}
      <div className="reader-header">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h2>{book.title}</h2>
        <div className="reader-controls">
          <button 
            className="control-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {book.pages}
          </span>
          <button 
            className="control-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= book.pages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="reader-content">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-section">
            <h3>Bookmarks</h3>
            <button className="btn btn-small" onClick={addBookmark}>
              Add Bookmark
            </button>
            <ul className="sidebar-list">
              {bookmarks.map((bookmark, index) => (
                <li key={index} onClick={() => handlePageChange(bookmark.page)}>
                  Page {bookmark.page}: {bookmark.content}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>Notes</h3>
            <button className="btn btn-small" onClick={addNote}>
              Add Note
            </button>
            <ul className="sidebar-list">
              {notes.map((note, index) => (
                <li key={index}>
                  <strong>Page {note.page}:</strong> {note.content}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>AI Tools</h3>
            <button className="btn btn-small">
              Summarize Current Chapter
            </button>
            <button className="btn btn-small">
              Generate Flashcards
            </button>
            <button className="btn btn-small">
              Ask AI Question
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="pdf-viewer">
          <div className="pdf-placeholder">
            <h3>Book Content Preview</h3>
            <p>This is where the PDF content would be displayed.</p>
            <p>In a real implementation, this would be replaced with an actual PDF viewer component.</p>
            <div className="page-content">
              <h4>Page {currentPage}</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Footer */}
      <div className="reader-footer">
        <div className="zoom-controls">
          <button className="control-btn">Zoom Out</button>
          <span>100%</span>
          <button className="control-btn">Zoom In</button>
        </div>
        <div className="theme-toggle">
          <button className="control-btn">🌙 Dark Mode</button>
        </div>
      </div>
    </div>
  );
};

export default BookReader;