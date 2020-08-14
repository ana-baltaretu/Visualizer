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

    function sqr(x) {
      return x * x;
    }

    function checkSpawn(circle1, circle2) {
        let x1 = circle1.style.top;
        let y1 = circle1.style.left;
        let x2 = circle2.style.top;
        let y2 = circle2.style.left;

        x1 = x1.substring(0, x1.length - 2);
        y1 = y1.substring(0, y1.length - 2);
        x2 = x2.substring(0, x2.length - 2);
        y2 = y2.substring(0, y2.length - 2);
        console.log(x1 + " " + y1 + " " + x2 + " " + y2);
        let dx = sqr(x1 - x2);
        let dy = sqr(y1 - y2);
        let d = Math.sqrt(dx + dy); // distance
        return circleRadius - d;
    }

    var nodes = document.getElementById("graph").children;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var circle = node.children[0];
      circle.style.width = circleRadius + "px";
      circle.style.height = circleRadius + "px";
      circle.style.position = "absolute";
      let ok = 0;
      while (ok === 0) {
        ok = 1;
        circle.style.left = leftOffset + Math.random() * spawnWidth + "px";
        circle.style.top = topOffset + Math.random() * spawnHeight + "px";
        for (var j = 0; j < i; j++) {
          var neighbour = nodes[j];
          var circle2 = neighbour.children[0];
          
          let diff = checkSpawn(circle, circle2);
          console.log(circle.offsetTop + " " + circle.offsetLeft);
          console.log(circle2.offsetTop + " " + circle2.offsetLeft);
          console.log(diff);
          if (diff > 0) {
            ok = 0;
          }
        }
      }
      
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
        {/* MAKE SURE TO LIMIT THE NUMBER OF ALLOWED NODES OR GENERATING THEM WILL CRASH */}
        {/* 70 nodes takes a while */}
        <div id = "graph" className = "graph" onMouseDown = {startMoving} onMouseUp = {stopMoving} onMouseLeave = {stopMoving}>
        {this.renderRow(10)}
        </div>
      </div>
      
    )
  }
}

export default Graph;

