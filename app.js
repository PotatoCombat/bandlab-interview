const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', indexRouter);

module.exports = app;
