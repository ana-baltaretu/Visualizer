import React from 'react';
import '../css/Stack.css';

global.index = 0;

class Stack_Item extends React.Component {

  render() {
    return (
      <button className = "stack_Item">
        {/* TODO */}
      </button>
    );
  }
}

class Stack extends React.Component {
  renderStackItem(i) {
    return <Stack_Item key = {i}/>;
  }

  renderStack(i) {
    var row = [];
    for (var j = 0; j < i; j++) {
      row.push(this.renderStackItem(j));
    }
    return row;
  }

  render() {
    return (
      <div className = "stack"> 
        {this.renderStack(20)}
        
      </div>
    )
  }
}

export default Stack;

