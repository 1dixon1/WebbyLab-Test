require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/User.js');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.APP_PORT || 8050;

app.use(express.json());
app.use('/api/auth', authRoutes);

// Example: Protected route
const authMiddleware = require('./middlewares/auth.middleware');
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
