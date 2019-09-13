import React from "react";
import { FlockSketchProps } from "./types";
import P5Wrapper from "react-p5-wrapper";
import JsFlockSimulator from "./js/flock";
import WasmFlockSimulator from "./wasm/flock";


export default function FlockingAnimation(props: FlockSketchProps){
    const FlockingSketch = props.shouldUseWasm
        ? WasmFlockSimulator(props)
        : JsFlockSimulator(props);

    return <P5Wrapper sketch={FlockingSketch} />;
}