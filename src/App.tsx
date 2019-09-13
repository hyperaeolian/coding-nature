import React, { useState } from "react";
import FlockingAnimation from "./sketches/simulations/flocking";
import "./App.css";


const App = () => {
  const [shouldUseWasm, setShouldUseWasm] = useState(false);
  const [numBoids, setNumBoids] = useState(150);

  return (
    <div className="App">
      <div>Should use Webassembly: <input type="checkbox" name="shouldUseWasm" value="shouldUseWasm" onChange={() => setShouldUseWasm(!shouldUseWasm)}></input></div>
      <div>Number of Boids: <input type="number" name="numBoids" min="10" max="1000" onChange={(e: any) => setNumBoids(e.target.value)} /></div>
      <div id="execution-time-display"></div>
      <header className="App-header">
        <FlockingAnimation shouldUseWasm={shouldUseWasm} numBoids={numBoids} />
      </header>
    </div>
  );
};

export default App;