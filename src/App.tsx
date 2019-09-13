import React, { useState } from "react";
import FlockingAnimation from "./sketches/simulations/flocking";
import "./App.css";


const App = () => {
  const [shouldUseWasm, setShouldUseWasm] = useState(false);
  const [numBoids, setNumBoids] = useState(150);

  return (
    <div className="App">
      <header className="App-header">
        <WasmToggle
          shouldUseWasm={shouldUseWasm}
          setShouldUseWasm={setShouldUseWasm }
        />
        <BoidsCounter
          numBoids={ numBoids }
          setNumBoids={ setNumBoids }
        />
        <div id="execution-time-display">Moving average: 0</div>
      </header>
        <FlockingAnimation shouldUseWasm={shouldUseWasm} numBoids={numBoids} />
    </div>
  );
};

function WasmToggle(props: any){
  return <div>
    <strong>Use Webassembly:</strong> <input
      type="checkbox"
      name="shouldUseWasm"
      value="shouldUseWasm"
      onChange={() => props.setShouldUseWasm(!props.shouldUseWasm)} />
  </div>;
}

function BoidsCounter(props: any){
  return <div>
    <strong>Number of Boids:</strong> <input
      type="number"
      name="numBoids"
      min="10"
      max="1000"
      value={props.numBoids}
      onChange={(e: any) => props.setNumBoids(e.target.value)} />
  </div>;
}

export default App;