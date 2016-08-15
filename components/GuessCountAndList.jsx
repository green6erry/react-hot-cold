//MY REACT

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../js/actions');



//the count will be the length of the guessArray
class GuessCountAndList extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(actions.fetchFewestGuesses(this.props.fewestGuesses));
  }
  render(){

    var guesses = this.props.guessArray.map(function(guess, index){
      return(
          <li key={index}>{guess}</li>
      );
    });

    return(
      <span>
        <p>Guess #<span id='count'>{this.props.guessCount}</span>!</p>
        <p>Fewest guesses: {this.props.fewestGuesses}</p>

        <ul id='guessList' className='guessBox clearfix'>
          {guesses}
        </ul>
      </span>
    );
  }
}

var Container = connect()(GuessCountAndList);

module.exports = Container;
