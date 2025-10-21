import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookReader from './pages/BookReader';
import BookDetails from './pages/BookDetails';
import GroupDetails from './pages/GroupDetails';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/book/:id/read" element={<BookReader />} />
              <Route path="/group/:id" element={<GroupDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;