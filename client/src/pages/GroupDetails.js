import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGroup } from '../features/groups/groupSlice';
import './GroupDetails.css';

const GroupDetails = () => {
  const { id: groupId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { group, isLoading } = useSelector((state) => state.groups);

  useEffect(() => {
    if (groupId) {
      dispatch(getGroup(groupId));
    }
  }, [groupId, dispatch]);

  if (isLoading) {
    return <div className="loading">Loading group details...</div>;
  }

  if (!group) {
    return <div className="error">Group not found</div>;
  }

  const isMember = group.members.some(member => member.user._id === user?.id);
  const isAdmin = group.createdBy._id === user?.id;

  return (
    <div className="group-details">
      <div className="group-header">
        <h1>{group.name}</h1>
        <p>{group.description}</p>
        <div className="group-info">
          <div className="info-item">
            <strong>Members:</strong> {group.members.length}/{group.maxMembers}
          </div>
          <div className="info-item">
            <strong>Created by:</strong> {group.createdBy.name}
          </div>
          <div className="info-item">
            <strong>Books:</strong> {group.books.length}
          </div>
        </div>
        
        {!isMember && (
          <button className="btn btn-primary">
            Join Group
          </button>
        )}
        
        {isMember && !isAdmin && (
          <button className="btn btn-secondary">
            Leave Group
          </button>
        )}
      </div>

      <div className="group-content">
        <div className="section">
          <h2>Members</h2>
          <div className="members-list">
            {group.members.map((member) => (
              <div key={member.user._id} className="member-card">
                <h3>{member.user.name}</h3>
                <p>{member.user.email}</p>
                <span className={`role ${member.role}`}>{member.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Group Books</h2>
          <div className="books-grid">
            {group.books.map((groupBook) => {
              const book = groupBook.book;
              return (
                <div key={book._id} className="book-card">
                  <img src={book.coverImage || '/placeholder-book.png'} alt={book.title} />
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                    {groupBook.accessExpiry && (
                      <p className="expiry">
                        Expires: {new Date(groupBook.accessExpiry).toLocaleDateString()}
                      </p>
                    )}
                    <Link to={`/book/${book._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section">
          <h2>Group Discussion</h2>
          <div className="discussion-form">
            <textarea placeholder="Start a discussion with your group..."></textarea>
            <button className="btn btn-primary">Post</button>
          </div>
          <div className="discussions-list">
            <div className="discussion-item">
              <h4>Welcome to {group.name}!</h4>
              <p>This is the beginning of your group discussion.</p>
              <div className="discussion-meta">
                <span>Posted by System</span>
                <span>Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;