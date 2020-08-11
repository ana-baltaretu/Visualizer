import React from 'react';
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className = "spacer">
          
        
          <input type="text" placeholder="Search.."></input>
          <div className = "content">
          <a href="/board" class="active"> 
            <button className = "button">Name1</button>
          </a>
           
            <button className = "button">Name2</button>
            <button className = "button">Name3</button>
            <button className = "button">Name4</button>
            <button className = "button">Name5</button>
            <button className = "button">Name6</button>
          </div>
        </div>

        
        
      </header>
    </div>
  );
}

export default App;
