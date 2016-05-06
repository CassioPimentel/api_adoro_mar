var express = require('express');

var app = module.exports = express();

var bodyparser = require('body-parser');

app.listen(process.env.PORT || 8080);

app.use(bodyparser.json());

app.set('json spaces', 2);	

app.use(bodyparser.urlencoded({

	extended: true		
}));
