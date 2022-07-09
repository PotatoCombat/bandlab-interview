const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./routes/posts');
const samplesRouter = require('./routes/samples');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', indexRouter);
app.use('/samples', samplesRouter);

module.exports = app;
