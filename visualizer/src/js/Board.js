import React from 'react';
import '../css/Board.css';
import '../css/_color-Scheme.css';

global.index = 0;

let isDrawing = false;

function startDrawing(event) {
  event.preventDefault();
  isDrawing = true;
}

function stopDrawing(event) {
  event.preventDefault();
  isDrawing = false;
}

class Square extends React.Component {

  render() {
    function startSquareColor(event) {
      event.preventDefault();
      if (event.target.classList.contains("wallColor"))
        event.target.classList.remove("wallColor");
      else event.target.classList.add("wallColor");
      isDrawing = true;
    }

    function changeSquareColor(event) {
      event.preventDefault();
      if (isDrawing === true) {
        if (event.target.classList.contains("wallColor"))
          event.target.classList.remove("wallColor");
        else event.target.classList.add("wallColor");
        //console.log("clicked " + event.target.id);
      }
    }

    return (
      <button className = "square" onMouseDown={startSquareColor} onMouseEnter = {changeSquareColor}  id = {global.index++}>
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
        <div>Input size: 
          <input className = "input-text" type="number" autoComplete="off" placeholder="N"/>
          <input className = "input-text" type="number" autoComplete="off" placeholder="M"/>
          <button>Generate</button>
        </div>
        
        <div className = "board" onMouseUp = {stopDrawing} onMouseDown={startDrawing}>
        {this.renderRectangularBoard(25,35)}
        </div>
      </div>
      
    )
  }
}

export default Board;

