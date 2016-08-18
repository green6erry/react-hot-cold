//MY react Hot or Cold

//New game 
//Makes a guess

var fetch = require('isomorphic-fetch');


var NEW_GAME = 'NEW_GAME';
var newGame = function(secretNumber){
  return {
    type: NEW_GAME,
    secretNumber: secretNumber
  };
};

var MAKE_GUESS = 'MAKE_GUESS';
var makeGuess = function(guess) {
  return {
    type: MAKE_GUESS,
    guess: guess
  };
};

var OPEN_MODAL = 'OPEN_MODAL';
var openModal = function(){
  return {
    type: OPEN_MODAL,
    show: true
  };
};

var CLOSE_MODAL = 'CLOSE_MODAL';
var closeModal = function(){
  return {
    type: CLOSE_MODAL,
    show: false
  };
};

var FETCH_FEWEST_GUESS_SUCCESS = 'FETCH_FEWEST_GUESS_SUCCESS';
var fetchFewestGuessSuccess = function(fewestGuesses){
  return {
    type: FETCH_FEWEST_GUESS_SUCCESS,
    fewestGuesses: fewestGuesses
  };
};

var FETCH_FEWEST_GUESS_ERROR = 'FETCH_FEWEST_GUESS_ERROR';
var fetchFewestGuessError = function(fewestGuesses, error){
  return {
    type: FETCH_FEWEST_GUESS_ERROR,
    fewestGuesses: fewestGuesses,
    error: error
  };
};

var SAVE_GUESS_COUNT_SUCCESS = 'SAVE_GUESS_COUNT_SUCCESS';
var saveGuessCountSuccess = function(guessCount){
    return {
    type: SAVE_GUESS_COUNT_SUCCESS,
    guessCount: guessCount
  };
};

var SAVE_GUESS_COUNT_ERROR = 'SAVE_GUESS_COUNT_ERROR';
var saveGuessCountError = function(guessCount, error){
    return {
    type: SAVE_GUESS_COUNT_SUCCESS,
    guessCount: guessCount,
    error: error
  };
};

var fetchFewestGuesses = function(fewestGuesses){
  
  return function(dispatch){
    console.log('dispatch ', dispatch);
    var url = 'http://localhost:4000/fewest-guesses';
    return fetch(url, {mode: 'no-cors'}).then(function(response){
      if (response.state < 200 || response.status >= 300){
        var error = new Error(response.statusText)
        error.response = response
        console.log('response ', response);
        throw error;
      }
      return response;
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data, 'from fetchFewestGuesses()');
      var fewestGuesses = data.fewestGuesses;
      return dispatch(fetchFewestGuessSuccess(fewestGuesses));
      })
    .catch(function(error){
      return dispatch(fetchFewestGuessError(fewestGuesses, error));
    });
  }
}

//!
var saveGuessCount = function(guessCount){
  console.log('from saveGuessCount, the guessCount being passed is ', guessCount);
  return function(dispatch){
    var url = 'http://localhost:4000/fewest-guesses';
    dispatch(saveGuessCountSuccess(guessCount));
    fetch(url, {
      mode: 'no-cors',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guessCount
      })
    })
    .then(function(data){
      console.log(data, 'from saveGuessCountSuccess');
    })
    .catch(function(error){
      return dispatch(saveGuessCountError(fewestGuesses, error));
    });
  }
};




exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;
exports.MAKE_GUESS = MAKE_GUESS;
exports.makeGuess = makeGuess;


exports.OPEN_MODAL = OPEN_MODAL;
exports.openModal = openModal;
exports.CLOSE_MODAL = CLOSE_MODAL;
exports.closeModal = closeModal;


exports.FETCH_FEWEST_GUESS_SUCCESS = FETCH_FEWEST_GUESS_SUCCESS;
exports.fetchFewestGuessSuccess = fetchFewestGuessSuccess;
exports.FETCH_FEWEST_GUESS_ERROR = FETCH_FEWEST_GUESS_ERROR;
exports.fetchFewestGuessError = fetchFewestGuessError;
exports.SAVE_GUESS_COUNT_SUCCESS = SAVE_GUESS_COUNT_SUCCESS;
exports.saveGuessCountSuccess = saveGuessCountSuccess;
exports.SAVE_GUESS_COUNT_ERROR = SAVE_GUESS_COUNT_ERROR;
exports.saveGuessCountError = saveGuessCountError;

//async
exports.fetchFewestGuesses = fetchFewestGuesses;
exports.saveGuessCount = saveGuessCount;

