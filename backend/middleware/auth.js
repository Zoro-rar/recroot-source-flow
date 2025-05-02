
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Modified protect middleware to bypass authentication
exports.protect = async (req, res, next) => {
  // Bypassing authentication - setting a default user
  req.user = {
    id: '65fa3d7d36e2673e4631706d', // Default user ID for testing
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin'
  };
  
  next();
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Bypassing role check since we're using a mock admin user
    next();
  };
};
