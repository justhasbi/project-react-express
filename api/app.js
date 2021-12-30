/**
 * this file is for routes, database connection and middleware
 *
 * TODO
 * [] Implement JWT for Auth
 */

const config = require('./utils/config');

const express = require('express');

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/users');

const postRoute = require('./routes/post')

const categoryRoute = require('./routes/category')

const multer = require('multer');

const path = require("path")

const middleware = require('./middleware/middleware');

const logger = require('./middleware/logger');

const app = express();

dotenv.config();

app.use(express.json());

app.use(middleware.requestLogger)

app.use("/public/images",
  express.static(path.join(__dirname, "/public/images")))

// MongoDB Connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((res) => {
  logger.info('Succes connect to MongoDB');
}).catch((err) => {
  logger.info('Error connect to MongoDB');
});

// Initialize Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res, next) => {
  res.status(200).json('file has been uploaded');
});

app.use('/api/auth', authRoute);

app.use('/api/users', userRoute);

app.use('/api/posts', postRoute);

app.use('/api/categories', categoryRoute);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;