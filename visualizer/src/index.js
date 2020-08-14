import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './css/index.css';
import App from './js/App';
import Board from './js/Board'
import Stack from './js/Stack'
import * as serviceWorker from './js/serviceWorker';
import Graph from './js/Graph';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/board">
        <Board />
      </Route>
      <Route path="/stack">
        <Stack />
      </Route>
      <Route path="/graph">
        <Graph />
      </Route>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
