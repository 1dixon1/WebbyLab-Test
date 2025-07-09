const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret';

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
