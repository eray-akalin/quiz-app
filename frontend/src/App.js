import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectRoute.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </UserProvider>

  );
}

export default App;