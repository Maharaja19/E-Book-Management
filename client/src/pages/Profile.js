import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    institution: user?.institution || '',
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would update the user profile here
    console.log('Profile update submitted:', formData);
    setEditing(false);
  };

  if (!user) {
    return <div className="error">Please login to view your profile</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          className="btn btn-secondary"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editing ? (
        <div className="profile-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="institution">Institution</label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={onChange}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <div className="profile-details">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p className="email">{user.email}</p>
              <p className="institution">{user.institution || 'No institution specified'}</p>
              <p className="role">Role: {user.role}</p>
              <p className="member-since">
                Member since: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <h3>{user.readingStats?.totalBooksRead || 0}</h3>
              <p>Books Read</p>
            </div>
            <div className="stat-card">
              <h3>{Math.floor((user.readingStats?.totalReadingHours || 0) / 60)}h {(user.readingStats?.totalReadingHours || 0) % 60}m</h3>
              <p>Total Reading Time</p>
            </div>
            <div className="stat-card">
              <h3>{user.readingStats?.currentStreak || 0}</h3>
              <p>Day Streak</p>
            </div>
            <div className="stat-card">
              <h3>{user.badges?.length || 0}</h3>
              <p>Badges</p>
            </div>
          </div>

          <div className="profile-section">
            <h2>My Badges</h2>
            <div className="badges-list">
              {user.badges && user.badges.length > 0 ? (
                user.badges.map((badge, index) => (
                  <div key={index} className="badge-card">
                    <div className="badge-icon">🏆</div>
                    <div className="badge-name">{badge}</div>
                  </div>
                ))
              ) : (
                <p>You haven't earned any badges yet.</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h2>Joined Groups</h2>
            <div className="groups-list">
              <p>You haven't joined any groups yet.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;