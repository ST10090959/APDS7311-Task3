const cors = require('cors');
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3001', // React app's URL
  credentials: true, // Allow credentials (cookies)
};

const app = express();

// Security: Use helmet to set secure headers
app.use(helmet());

// Enable CORS with credentials
app.use(cors(corsOptions));

// Set up cookie parser (if needed for other purposes)
app.use(cookieParser());

// Logging and parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use('/', indexRouter);
app.use('/api/users', usersRouter); // Keep API routes under

// 404 and error handling
app.use(function (req, res, next) 
{
  next(createError(404));
});

app.use(function (err, req, res, next) 
{
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;



