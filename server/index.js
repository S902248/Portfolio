// index.js
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Contact = require('./contact.model');

const app = express();
const PORT = process.env.PORT ||  5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Contact save error:', error);
    res.status(500).json({ success: false, message: 'Error saving message.', error: error.message });
  }
});

// Get all contact messages
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Error fetching messages.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// You can now use process.env.MONGO_URI to access the MongoDB URI
