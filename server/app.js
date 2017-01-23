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

// Read
app.get('/articles/:title', (req, res) => {
	var article = storage.get(req.params.title);

	// Todo: then do something with this article.
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