require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from public folder (✅ for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded media (images/videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const complaintRoutes = require('./routes/complaint');
const adminRoutes = require('./routes/admin');

app.use('/api/complaint', complaintRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
