import * as p5Instance from "p5";
import { createBoid, renderBoid } from "./boid";
import { WasmBoid, FlockSketchProps, WithCanvas } from "../types";
import { timeExecution } from "../../utils";


export default (props: FlockSketchProps) => function WasmFlockingSketch(p5: p5Instance) {

    let boids: WasmBoid[] = [];
    const displayNode: HTMLElement = document.getElementById("execution-time-display") as HTMLElement;
    const drawBoid = renderBoid.bind(null, p5);
    let sum = 0;

    function runOnce() {
        initCanvas();
        initBoids();
        
    }

    function runOnEveryFrame() {
        p5.background(51);
        const executionTime = timeExecution(() => {
            boids = window.computationEngine.flock(p5.width, p5.height, boids) || [];
            for (let i = 0; i < boids.length; i++) {
                drawBoid(boids[i]);
            }
        });
        sum += executionTime;
        if (p5.frameCount % 100 === 0) {
            displayNode.innerText = `Moving Average ${sum / 100}`;
            sum = 0;
        }
    }

    function initCanvas(){
        const element = p5.createCanvas(window.innerWidth, window.innerHeight) as p5Instance.Renderer & WithCanvas;
        element.canvas.style.position = "absolute";
    }

    function initBoids(){
        const startPositionX = p5.width * 0.5;
        const startPositionY = p5.height * 0.5;
        for (let i = 0; i < props.numBoids; i++) {
            boids.push(createBoid(startPositionX, startPositionY));
        }
    }

    p5.setup = runOnce;
    p5.draw = runOnEveryFrame;
};
