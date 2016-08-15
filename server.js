//MY react hot and cold

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var port = process.env.PORT || 4000;

var fewestGuesses = function(){
  this.fewestGuesses = 100;	
};

fewestGuesses.prototype.updateNumberOfGuesses = function(guessCount){
  this.fewestGuesses = guessCount;
};

var sessionFewestGuesses = new fewestGuesses();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', express.static('public'));
//http://www.senchalabs.org/connect/static.html

app.get('/fewest-guesses', function(req, res){
	console.log('req ', req);
	console.log('res ', res);
  res.json({guesses: parseInt(sessionFewestGuesses.fewestGuesses, 10)});
});

app.post('/fewest-guesses', function(req, res){
  var guess = sessionFewestGuesses.updateNumberOfGuesses(req.body.guessCount);
  console.log('req.body ', req.body);
  console.log('req.body.guessCount ', req.body.guessCount);
  res.status(201).json({guesses: parseInt(guess, 10)});
});

app.listen(port, function(){
  console.log('express listening on ' + port);
});

exports.app = app;
