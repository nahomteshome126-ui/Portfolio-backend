require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

// ❗ Wait for MongoDB FIRST
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');

        // 👉 Routes ONLY after DB connection
        app.use('/api/messages', require('./routes/messages'));
        app.use('/api/comments', require('./routes/comments'));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    })
    .catch((err) => {
        console.log('❌ MongoDB connection error:', err);
    });
