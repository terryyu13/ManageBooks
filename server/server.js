const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

// Routes
const itemRoutes = require('./routes/items'); // 引入路由文件
app.use('/api/items', itemRoutes);            // 掛載路由c

// Routes
app.get('/', (req, res) => res.send('API is running'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
