import React from 'react';
import '../css/Board.css';

global.index = 0;

class Square extends React.Component {


  render() {

    function changeSquareColor(event) {
      event.preventDefault();
      if (event.target.style.backgroundColor === "red")
        event.target.style.backgroundColor = "green";
      else event.target.style.backgroundColor = "red";
      console.log("clicked " + event.target.id);
    }


    return (
      <button className = "square" onClick={changeSquareColor} id = {global.index++ / 2}>
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, j) {
    return <Square key = {i + j}/>;
  }

  renderRow(i, count) {
    var row = [];
    for (var j = 0; j < count; j++) {
      row.push(this.renderSquare(i, j));
    }
    return row;
  }

  renderSquaredBoard(N) {
    var SquareBoard = [];
    for (var i = 0; i < N; i++) {
      SquareBoard.push(
        <div key = {i} className = "board-row">
        {this.renderRow(i, N)}
        </div>
      );
    }
    return SquareBoard;
  }

  renderRectangularBoard(N, M) {
    var RectangularBoard = [];
    for (var i = 0; i < N; i++) {
      RectangularBoard.push(
        <div key = {i} className = "board-row">
        {this.renderRow(i, M)}
        </div>
      );
    }
    return RectangularBoard;
  }

  render() {
    return (
      <div>
        {this.renderSquaredBoard(10)}
        {this.renderRectangularBoard(10,20)}
        
      </div>
    )
  }
}

export default Board;

