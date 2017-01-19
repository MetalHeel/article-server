var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

// CRUD
app.get('/', function(req, res) {
	res.send('Hey there.');
});

app.listen(3000);