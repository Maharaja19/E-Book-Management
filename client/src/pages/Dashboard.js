import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../features/books/bookSlice';
import { getUserGroups } from '../features/groups/groupSlice';
import { getStats } from '../features/progress/progressSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);
  const { groups } = useSelector((state) => state.groups);
  const { stats } = useSelector((state) => state.progress);

  useEffect(() => {
    if (user) {
      dispatch(getBooks());
      dispatch(getUserGroups(user.id));
      dispatch(getStats(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats?.totalBooks || 0}</h3>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h3>{stats?.completedBooks || 0}</h3>
          <p>Completed Books</p>
        </div>
        <div className="stat-card">
          <h3>{Math.floor((stats?.totalReadingTime || 0) / 60)}h {(stats?.totalReadingTime || 0) % 60}m</h3>
          <p>Total Reading Time</p>
        </div>
        <div className="stat-card">
          <h3>{groups?.length || 0}</h3>
          <p>Groups</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section">
          <div className="section-header">
            <h2>My Books</h2>
            <Link to="/books" className="btn btn-secondary">
              View All
            </Link>
          </div>
          <div className="book-grid">
            {books.slice(0, 4).map((book) => (
              <div key={book._id} className="book-card">
                <img src={book.coverImage || '/placeholder-book.png'} alt={book.title} />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>by {book.author}</p>
                  <Link to={`/book/${book._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2>My Groups</h2>
            <Link to="/groups" className="btn btn-secondary">
              View All
            </Link>
          </div>
          <div className="group-list">
            {groups.slice(0, 3).map((group) => (
              <div key={group._id} className="group-card">
                <h3>{group.name}</h3>
                <p>{group.members.length} members</p>
                <p>{group.books.length} books</p>
                <Link to={`/group/${group._id}`} className="btn btn-primary">
                  View Group
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;