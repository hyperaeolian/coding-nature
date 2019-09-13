import React from "react";
import FlockingAnimation from "./sketches/simulations/flocking";
import "./App.css";



const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <FlockingAnimation shouldUseWasm={true} numBoids={150} />
      </header>
    </div>
  );
};

export default App;