const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Create
app.post('/articles', (req, res) => {

});

// Read
app.get('/articles', (req, res) => {
  res.send("Hi");
});

// Update
app.put('/articles', (req, res) => {

});

// Delete
app.delete('/articles', (req, res) => {

});

module.exports = app;