import React from "react";
import * as p5Instance from "p5";
import { Boid } from "./types";
import P5Wrapper from "react-p5-wrapper";
import { createBoid, renderBoid } from "./boid";

declare global {
    interface Window {
        computationEngine: any;
    }
}

interface WithCanvas {
    canvas: HTMLCanvasElement;
}

async function FlockingSketch(p5: p5Instance) {

    let boids: Boid[] = [];
    let numBoids = 150;

    const drawBoid = renderBoid.bind(null, p5);

    function runOnce() {
        initCanvas();
        initBoids();
        
    }

    function runOnEveryFrame() {
        p5.background(51);
        boids = window.computationEngine.flock(p5.width, p5.height, boids) || [];
        for (let i = 0; i < boids.length; i++) {
            drawBoid(boids[i]);
        } 
    }

    function initCanvas(){
        const element = p5.createCanvas(window.innerWidth, window.innerHeight) as p5Instance.Renderer & WithCanvas;
        element.canvas.style.position = "absolute";
    }

    function initBoids(){
        const startPositionX = p5.width * 0.5;
        const startPositionY = p5.height * 0.5;
        for (let i = 0; i < numBoids; i++) {
            boids.push(createBoid(startPositionX, startPositionY));
        }
    }

    p5.setup = runOnce;
    p5.draw = runOnEveryFrame;
}

export default function FlockingAnimation(){
    return <P5Wrapper sketch={FlockingSketch} />;
}