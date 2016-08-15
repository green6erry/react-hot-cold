// MY REACT
var actions = require('./actions');

var secretNumber = Math.floor(Math.random() * 100) + 1;

var initialGameState = {
  guessArray: [],
  userGuess: '',
  fewestGuesses: 150,
  guessCount: 0,
  secretNumber: secretNumber,
  feedback: 'Make your Guess!',
  isModalOpen: false,
  gameOver: false
};

var gameReducer = function(state, action) {
    console.log ('state ', state); 
    console.log('action ', action);

    state = state || initialGameState;  
    console.log ('state ', state); 
    console.log('action ', action);
    if (action.type === actions.NEW_GAME) {
        var newState = Object.assign({
            secretNumber: action.secretNumber
        }, initialGameState);
        return newState;
    } else if (action.type === actions.MAKE_GUESS) {
    	var userGuess = action.guess;
        var secretNumber = state.secretNumber;
        var guessArray = state.guessArray;
        var guessCount = state.guessCount;
        var feedback = hotOrCold(userGuess, secretNumber, guessArray + 1);
        var newState = Object.assign({}, state, {
            userGuess: userGuess,
            guessArray: guessArray.concat(userGuess),
            feedback: feedback,
            guessCount: guessCount + 1
        });
        newState.guessedCorrect = Number(action.guess) === state.secretNumber;
        console.log('action.guess ', action.guess);
        console.log('state.secretNumber ', state.secretNumber);

        if (newState.guessedCorrect){
            console.log('you made it!');
            newState.gameOver = true;
        }
    	console.log('newState count ', newState.guessCount)
        return newState;

    } else if (action.type === actions.OPEN_MODAL){
        var modalState = Object.assign({}, state, {
          isModalOpen: action.show
        });
        return modalState;

      } else if (action.type === actions.CLOSE_MODAL){
        var modalState = Object.assign({}, state, {
          isModalOpen: action.show
        });
        return modalState;

      } else if (action.type === actions.FETCH_FEWEST_GUESS_SUCCESS) {
            var fewestGuesses = compareNumberOfGuesses(state.fewestGuesses, state.guessCount);
            var newFewest = Object.assign({}, state, {
                fewestGuesses: action.fewestGuesses});
            return newFewest;

      } else if (action.type === actions.FETCH_FEWEST_GUESS_ERROR) {
        console.log('There was error in fetch fewest');
        throw new Error('The game broke');

      } else if (action.type === actions.SAVE_GUESS_COUNT_SUCCESS) {
            console.log('guess count ', state.guessCount);

      } else if (action.type === actions.SAVE_GUESS_COUNT_ERROR) {
            console.log('There was error in save fewest');
            throw new Error('The game broke');
      } else {
        console.log('I don\'t know that action:', action.type);
      }


    //logic for the game. returns feedback to the player.
    function hotOrCold(userGuess, secretNumber, guessArray){
      var userGuess = parseInt(userGuess, 10);
      var feedback;

      //form validation
      if (isNaN(userGuess) || (userGuess < 1 || userGuess > 100)){
        console.log('Enter a number between 1 and 100');
      }
      //check to see if the guess wins the game
      if (userGuess == secretNumber) {
        feedback = 'YOU WIN!!!';

      }
      else { //play the game.
        var currentDifference = Math.abs(secretNumber - userGuess);
        var previousDifference = Math.abs(secretNumber - parseInt(guessArray[guessArray.length - 1], 10));

        if (currentDifference == previousDifference) {
          console.log('Please enter a different number');
        }
        else if (currentDifference > 50) {
          feedback = 'Very cold!';
          debugger;
        }
        else if (currentDifference <= 50 && currentDifference > 30){
          feedback = 'Cold';

        }
        else if (currentDifference <= 30 && currentDifference > 10) {
          feedback = 'Hot';

        }
        else {
          feedback = 'Very hot!';
        }
      }
      console.log('feedback ', feedback);
      return feedback;
    };

    function compareNumberOfGuesses(fewestGuesses, guessCount){
      if (fewestGuesses <= currentGuesses){
        return fewestGuesses;
      } else {
        return currentGuesses;
      }
    };

    return state;

}




exports.gameReducer = gameReducer;

