import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//Function components are less tedious to write than classes, and many components can be expressed this way.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
      {/* formula for this do not get lost: <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
      squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      //Unlike the array push() method you might be more familiar with, the concat() method doesn't mutate the original array, so we prefer it.
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  // method to update the step number with relation to x
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move} className={"game-info-li"}>
          <button onClick={() => this.jumpTo(move)} className={"moves-btn"}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = `Winner: ${winner}`;

    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className={"game-info-status"}>{status}</div>
          <ol className={"game-info-ol"}>{moves}</ol>
        </div>
      </div>
    );
  }
}
//this function to declare a winner
   function calculateWinner(squares) {
     const lines = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6],
     ];
     for (let i = 0; i < lines.length; i++) {
       const [a, b, c] = lines[i];
       if (
         squares[a] &&
         squares[a] === squares[b] &&
         squares[a] === squares[c]
       ) {
         return squares[a];
       }
     }
     return null;
   }
// ========================================
ReactDOM.render(
 <Game /> ,
  document.getElementById('root')
);