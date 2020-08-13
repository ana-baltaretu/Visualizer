import React from 'react';
import '../css/Graph.css';
import '../css/_color-Scheme.css';

global.index = 0;

let isMoving = false;

function startMoving(event) {
  event.preventDefault();
  isMoving = true;
}

function stopMoving(event) {
  event.preventDefault();
  isMoving = false;
}

class Circle extends React.Component {

  render() {

    function placeDiv(event) {
      event.preventDefault();
      if (isMoving === true) {
        var d = event.target;
        d.style.position = "absolute";
        console.log(event.target.id);
        d.style.left = event.clientX - 5 + 'px';
        d.style.top = event.clientY - 5 + 'px';
      }
      
    }

    return (
      <div>
          <button className = "circle" id = {global.index++} style = {{position: "absolute", left: 100 + Math.random() * 500 +"px", top: 50 + Math.random() * 500 + "px"}} onMouseMove = {placeDiv}>
          </button>
      </div>
      
    );
  }
}

class Graph extends React.Component {
  renderCircle(j) {
    return <Circle key = {j}/>;
  }

  renderRow(count) {
    var row = [];
    for (var j = 0; j < count; j++) {
      row.push(this.renderCircle(j));
    }
    return row;
  }

  

  render() {

    return (
      <div>
        <div className = "graph" >
        {this.renderRow(10)}
        </div>
      </div>
      
    )
  }
}

class GraphBox extends React.Component {
  renderGraph() {
    return <Graph/>;
  }

  render() {

    return (
      <div className = "graphBox" onMouseDown = {startMoving} onMouseUp = {stopMoving} onMouseLeave = {stopMoving}>
        {this.renderGraph()}
      </div>
    )
  }
}

export default GraphBox;

