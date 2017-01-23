const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const storage = require('../src/Storage.js');

const app = express();

app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Create
app.post('/articles', (req, res) => {
	storage.create(req.body);
});

// Read All
app.get('/articles', (req, res) => {
	var articles = storage.getAll();

	res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(articles));
});

// Read
app.get('/articles/:title', (req, res) => {
	var article = storage.get(req.params.title);

	res.send(article);
});

// Update
app.put('/articles/:title', (req, res) => {
	storage.update(req.params.title, req.body);
});

// Delete
app.delete('/articles/:title', (req, res) => {
	storage.remove(req.params.title);
});

module.exports = app;