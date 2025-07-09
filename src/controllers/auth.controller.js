const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ where: { username } });
  if (exists) return res.status(409).json({ message: 'User exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash: hash });
  res.json({ id: user.id, username: user.username });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1d' });
  res.json({ token });
};
