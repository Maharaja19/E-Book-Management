import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch this data from the API
    setBooks([
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', price: 29.99, accessType: 'premium', status: 'published' },
      { id: 2, title: 'Design Patterns', author: 'Gang of Four', category: 'Technology', price: 39.99, accessType: 'premium', status: 'published' },
      { id: 3, title: 'Introduction to Algorithms', author: 'Cormen', category: 'Computer Science', price: 0, accessType: 'free', status: 'published' },
    ]);
    
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2023-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joinDate: '2023-02-20' },
      { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joinDate: '2023-01-01' },
    ]);
    
    setGroups([
      { id: 1, name: 'Computer Science Study Group', members: 3, maxMembers: 4, books: 2, createdBy: 'John Doe' },
      { id: 2, name: 'Engineering Students', members: 4, maxMembers: 4, books: 1, createdBy: 'Jane Smith' },
    ]);
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="error">
        Access denied. You must be an administrator to view this page.
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage books, users, and groups</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{books.length}</h3>
                <p>Total Books</p>
              </div>
              <div className="stat-card">
                <h3>{users.length}</h3>
                <p>Total Users</p>
              </div>
              <div className="stat-card">
                <h3>{groups.length}</h3>
                <p>Total Groups</p>
              </div>
              <div className="stat-card">
                <h3>124</h3>
                <p>Active Sessions</p>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <p><strong>John Doe</strong> joined the group "Computer Science Study Group"</p>
                  <span>2 hours ago</span>
                </div>
                <div className="activity-item">
                  <p><strong>Jane Smith</strong> purchased the book "Clean Code"</p>
                  <span>5 hours ago</span>
                </div>
                <div className="activity-item">
                  <p><strong>Admin User</strong> uploaded a new book "Design Patterns"</p>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="books-tab">
            <div className="tab-header">
              <h2>Book Management</h2>
              <button className="btn btn-primary">Add New Book</button>
            </div>
            <div className="books-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>${book.price}</td>
                      <td>
                        <span className={`type-badge ${book.accessType}`}>
                          {book.accessType}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${book.status}`}>
                          {book.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-small btn-secondary">Edit</button>
                        <button className="btn btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-tab">
            <div className="tab-header">
              <h2>User Management</h2>
              <button className="btn btn-primary">Add New User</button>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button className="btn btn-small btn-secondary">Edit</button>
                        <button className="btn btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="groups-tab">
            <div className="tab-header">
              <h2>Group Management</h2>
              <button className="btn btn-primary">Create New Group</button>
            </div>
            <div className="groups-table">
              <table>
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Members</th>
                    <th>Books</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group) => (
                    <tr key={group.id}>
                      <td>{group.name}</td>
                      <td>{group.members}/{group.maxMembers}</td>
                      <td>{group.books}</td>
                      <td>{group.createdBy}</td>
                      <td>
                        <button className="btn btn-small btn-secondary">View</button>
                        <button className="btn btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <h2>Analytics Dashboard</h2>
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Book Popularity</h3>
                <div className="chart-placeholder">
                  <p>Bar chart showing most read books</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>User Engagement</h3>
                <div className="chart-placeholder">
                  <p>Line chart showing user activity over time</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>Reading Hours</h3>
                <div className="chart-placeholder">
                  <p>Pie chart showing reading time distribution</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>Group Activity</h3>
                <div className="chart-placeholder">
                  <p>Heatmap showing group participation</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;