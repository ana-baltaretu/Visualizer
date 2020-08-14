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
        // console.log(event.target.id + " " + event.clientX + " " + event.clientY + " " + d.style.left + " " + d.style.top);
        d.style.left = event.clientX - 15 + 'px';
        d.style.top = event.clientY - 15 + 'px';
      }
    }

    return (
      <div>
          <button className = "circle" id = {global.index++}  
          onMouseMove = {placeDiv} > 
          </button>
      </div>
      
    );
  }
}

class Graph extends React.Component {


  componentDidMount() {

    var graph = document.getElementById("graph");

    
    graph.style.minHeight = 300 + "px";
    graph.style.minWidth = 300 + "px";
    graph.style.maxWidth = 500 + "px";

    let topOffset = graph.offsetTop;
    let leftOffset = graph.offsetLeft;
    let circleRadius = 34;
    let height = graph.offsetHeight;
    let width = graph.offsetWidth;
    let spawnHeight = height - circleRadius - 10;
    let spawnWidth = width - circleRadius - 10;
    // console.log(topOffset + " " + leftOffset);
    // console.log(height + " " + width);
    // console.log(graph.children);
    var nodes = document.getElementById("graph").children;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var circle = node.children[0];
      circle.style.width = circleRadius + "px";
      circle.style.height = circleRadius + "px";
      circle.style.position = "absolute";
      circle.style.left = leftOffset + Math.random() * spawnWidth + "px";
      circle.style.top = topOffset + Math.random() * spawnHeight + "px";
      // console.log(circle.offsetTop + " " + circle.offsetLeft);
    }
  }

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
        <div id = "graph" className = "graph" onMouseDown = {startMoving} onMouseUp = {stopMoving} onMouseLeave = {stopMoving}>
        {this.renderRow(10)}
        </div>
      </div>
      
    )
  }
}

export default Graph;

