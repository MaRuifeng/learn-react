import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick() }>
//         {this.props.value}
//       </button>
//     );
//   }
// }

const BOARD_SIZE = 3;
function Square(props) { // React functional component
  return (
    <button className={"square " + (props.isWinningCell ? 'winning-cell' : '')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSqaure(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinningCell={this.props.winningCells.includes(i)}
        key={i}
      />
    );
  }
  render() {
    // return (
    //   <div>
    //     <div className="board-row">
    //       {this.renderSqaure(0)}
    //       {this.renderSqaure(1)}
    //       {this.renderSqaure(2)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSqaure(3)}
    //       {this.renderSqaure(4)}
    //       {this.renderSqaure(5)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSqaure(6)}
    //       {this.renderSqaure(7)}
    //       {this.renderSqaure(8)}
    //     </div>
    //   </div>
    // );
    const squareList = [];
    let idx = 0;
    for (let i=0; i<BOARD_SIZE; i++) {
      let row = [];
      for (let j=0; j<BOARD_SIZE; j++) {
        row.push(this.renderSqaure(idx));
        idx++;
      }
      squareList.push(row);
    }
    return (
      <div>
          {squareList.map((row, idx) => {
            return (
              <div className="board-row" key={idx}>
                {row}
              </div>
            );
          })}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        latestMove: Array(2).fill(null), // column and row index
        latestMoveIdx: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      selectedMove: -1,
      ascending: true, // default
    };
  }

  handleClick(i) {
    // console.log('Row: ' + (Math.floor(i/BOARD_SIZE) + 1));
    // console.log('Col: ' + (i%BOARD_SIZE + 1));
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // copy of immutable data object
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) { // ignore click when game is over or square is clicked already
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const latestMove = [];
    latestMove.push(i%BOARD_SIZE+1);
    latestMove.push(Math.floor(i/BOARD_SIZE)+1);
    this.setState({
      history: history.concat([{
        squares: squares,
        latestMove: latestMove,
        latestMoveIdx: history.length,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      selectedMove: step,
    });
  }

  toggleOrder() {
    this.setState({
      ascending: !this.state.ascending,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = (this.state.ascending ? history : history.slice().reverse()).map((step, move) => {
      // console.log(history);
      // console.log(step);
      // const desc = move ?
      const desc = step.latestMoveIdx ?
        'Go to move #' + step.latestMoveIdx + ' at column ' + step.latestMove[0] + ' and row ' + step.latestMove[1] :
        'Go to game start';
      return (
        <li key={step.latestMoveIdx}>
          <button
            onClick={() => this.jumpTo(step.latestMoveIdx)}
            className={this.state.selectedMove === step.latestMoveIdx ? 'selected-move' : ''}>
            {desc}
          </button>
        </li>
      );
    });
    let status, winningCells = [];
    if (winner) {
      status = 'Winner: ' + winner.winner;
      winningCells = winner.winningCells;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningCells={winningCells}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div
            style = {{ color: 'red'}}
            className={winner === null && this.state.stepNumber === Math.pow(BOARD_SIZE, 2)? '' : 'hidden'}>
            No player wins! The game ends in a draw.
          </div>
          <div>
            <button onClick={() => this.toggleOrder()} style={{ color: 'green' }}>Toggle Order</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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
  for (let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //return squares[a];
      return {winner: squares[a], winningCells: [a, b, c]};
    }
  }
  return null;
}
// =============================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
