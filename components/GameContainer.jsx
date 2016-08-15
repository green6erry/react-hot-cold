var React = require('react');
var connect = require('react-redux').connect;

var Header = require('./Header');
var Game = require('./Game');

var actions = require('../js/actions');

class GameContainer extends React.Component{
  constructor(props){
    super(props);

  }
  componentWillMount(){
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps ', nextProps);
    if(nextProps.gameOver){
      this.props.dispatch(actions.saveGuessCount(this.props.guessCount));
    }
  }
  render() {
    return (
      <span>
        <Header modalState={this.props.isModalOpen} />
        <Game />
      </span>
    );
  }
}

var mapStateToProps = function(state, props){
  return {
    isModalOpen: state.isModalOpen,
    gameOver: state.gameOver,
    guessCount: state.guessCount
  };
};

var Container = connect(mapStateToProps)(GameContainer);

module.exports = Container;


