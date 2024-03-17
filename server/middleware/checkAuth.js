import jwt from 'jsonwebtoken';

const checkAuthMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization token not provided' });
  }

  // Verify the token
  jwt.verify(token, 'birds_are_great', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Attach the decoded user information to the request object
    req.userId = decoded.userId;
    next();
  });
};

export default checkAuthMiddleware;
