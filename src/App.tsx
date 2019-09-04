import React from "react";
import FlockingAnimation from "./sketches/simulations/flocking";
import "./App.css";



const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <FlockingAnimation />
      </header>
    </div>
  );
};

export default App;