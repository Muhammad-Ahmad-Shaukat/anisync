import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  return isAuthenticated ? <Navigate to="/profile" replace /> : children;
};

export default RedirectIfAuth;
