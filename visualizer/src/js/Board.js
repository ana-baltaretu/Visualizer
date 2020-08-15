import React from 'react';
import '../css/Board.css';
import '../css/Slider.css';
import '../css/_color-Scheme.css';

global.index = 0;

let isDrawing = false;
let lastLocation = -Infinity;
global.N = 20;
global.M = 20;

let dx = [-1, 0, 1, 0];
let dy = [0, -1, 0, 1];

function startDrawing(event) {
  event.preventDefault();
  let d = document.getElementById("typeOfDrawing");
  console.log(d.checked);
  if (d.checked === false) {
    isDrawing = true;
  }
}

function stopDrawing(event) {
  event.preventDefault();
  isDrawing = false;
}

class Square extends React.Component {

  render() {
    function startSquareColor(event) {
      event.preventDefault();
      let d = document.getElementById("typeOfDrawing");
      console.log(d.checked);
      if (d.checked === false) { /// DRAW WALLS
        isDrawing = true;
        if (event.target.classList.contains("pathColor"))
          event.target.classList.remove("pathColor");
        if (event.target.classList.contains("wallColor") )
          event.target.classList.remove("wallColor");
        else if (event.target.classList.contains("startColor") == false)
          event.target.classList.add("wallColor");
      } else { /// DRAW STARTING POINT
        if (event.target.classList.contains("wallColor"))
          event.target.classList.remove("wallColor");
        if (event.target.classList.contains("pathColor"))
          event.target.classList.remove("pathColor");
        
        if (lastLocation !== -Infinity) {
          document.getElementById(lastLocation).classList.remove("startColor");
        }
        lastLocation = event.target.id;
        console.log(lastLocation);
        event.target.classList.add("startColor");
      }
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
      <button className = "square" onMouseDown={startSquareColor} onMouseEnter = {changeSquareColor}  id = {++global.index}>
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

  renderRectangularBoard(N, M) {
    var RectangularBoard = [];
    for (var i = 0; i < N; i++) {
      RectangularBoard.push(
        <div key = {i} id = {i} className = "board-row">
        {this.renderRow(i, M)}
        </div>
      );
    }
    return RectangularBoard;
  }
  

  render() {

    function isInside(line, col) {
      return line >= 0 && col >= 1 && line < global.N && col <= global.M;
    }

    function dfs(nodeId) {
      /** LINE START FROM 0, COL START FROM 1 cuz it doesn't like it otherwise for some reason*/
      var node = document.getElementById(nodeId);
      console.log("this nodeId = " + nodeId);
      console.log("this node = " + node.classList);
      if (!node.classList.contains("startColor"))
        node.classList.add("pathColor");
      var line = parseInt(node.parentElement.id);
      var col = parseInt(node.id - line * global.M);
      console.log("line = " + line);
      console.log("col = " + col);
      setTimeout(function(){
        for (var d = 0; d < 4; d++) {
          var nextLine = line + dx[d];
          var nextCol = col + dy[d];
          //console.log(dx[d] + " " + dy[d]);
          //console.log(nextLine + " " + nextCol + " " + isInside(nextLine, nextCol));
          
          if (isInside(nextLine, nextCol) === true) {
            var nextNodeId = nextLine * global.M + nextCol;
            var nextNode = document.getElementById(nextNodeId);
            console.log("next nodeId = " + nextNodeId);
            console.log("next node = " + nextNode.classList);
            if (nextNode.classList.contains("startColor") === false 
              && nextNode.classList.contains("wallColor") === false 
              && nextNode.classList.contains("pathColor") === false) {
              dfs(nextNodeId);
            }
          }
        }
      }, 100);
    }

    function clearPaths() {
      for (var ind = 0; ind <= global.N * global.M; ind++) {
        var node = document.getElementById(ind);
        if (node.classList.contains("pathColor"))
          node.classList.remove("pathColor");
      }
    }

    function startDfs() {
      /**
       * FIX TO WORK LIKE DFS NOT BFS (use stack i guess)
       * MAKE BFS
       */
      clearPaths();
      if (lastLocation != -1) {
          dfs(lastLocation);
      }
    }

    return (
      <div>
        <div>Input size: 
          <input className = "input-text" type="number" autoComplete="off" placeholder="N"/>
          <input className = "input-text" type="number" autoComplete="off" placeholder="M"/>
          <button>Generate</button>
        </div>
        <div>
          Draw walls
          <label className="switch">
            <input id = "typeOfDrawing" type="checkbox"></input>
            <span className="slider round"></span>
          </label>
          Draw starting point
        </div>
        <button onClick = {startDfs}>Run</button>
        <button onClick = {clearPaths}>Clear</button>
        
        
        <div className = "board" onMouseUp = {stopDrawing} onMouseDown={startDrawing}>
        {this.renderRectangularBoard(global.N, global.M)}
        </div>
      </div>
      
    )
  }
}

export default Board;

