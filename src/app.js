const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


app.use(express.json());

const allowedOrigins = [
  'https://auth-user-management-system.vercel.app',
  'https://auth-user-management-system-andersonvlidios-projects.vercel.app',
  'https://auth-user-management-system-5b8pwtc68-andersonvlidios-projects.vercel.app',
  'https://auth-user-management-system-git-master-andersonvlidios-projects.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
