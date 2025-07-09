require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/User.js');
const authRoutes = require('./routes/auth.routes');
const { Movie, Actor } = require('./models');

const app = express();
const PORT = process.env.APP_PORT || 8050;

app.use(express.json());
app.use('/api/auth', authRoutes);

// Example: Protected route
const authMiddleware = require('./middlewares/auth.middleware');
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

const movieRoutes = require('./routes/movie.routes');
app.use('/api/movies', movieRoutes);

const path = require('path');
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/register.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/app.html'));
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
