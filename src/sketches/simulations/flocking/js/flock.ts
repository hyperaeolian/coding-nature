import * as p5Instance from "p5";
import Boid from "./boid";
import { WithCanvas, FlockSketchProps } from "../types";
import { timeExecution } from "../../utils";


export default (props: FlockSketchProps) => function JsFlockingSketch(p5: p5Instance) {

	let boids: Boid[];
	const displayNode: HTMLElement = document.getElementById("execution-time-display") as HTMLElement;
	let sum = 0;

    function runOnce() {
		initCanvas();
		boids = initBoids();
    }

    function runOnEveryFrame() {
		p5.background(51);
		const executionTime = timeExecution(() => {
			for (let i = 0; i < boids.length; i++) {
				boids[i].run(boids);
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
		const boids = [];
		const startX = p5.width / 2;
		const startY = p5.height / 2;
        for (let i = 0; i < props.numBoids; i++) {
			let boid = new Boid(startX, startY, p5);
			boids.push(boid);
		}
		return boids;
	}

    p5.setup = runOnce;
    p5.draw = runOnEveryFrame;
}

