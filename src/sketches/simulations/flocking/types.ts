import * as p5Instance from "p5";

export interface Vec3D {
    x: number;
    y: number;
    z: number;
};

export interface WasmBoid {
    acceleration: Vec3D;
    velocity: Vec3D;
    position: Vec3D;
    size: number;
    max_speed: number;
    max_force: number;
};

export interface JsBoid {
    p5: p5Instance;
    acceleration: p5Instance.Vector;
    position: p5Instance.Vector;
    velocity: p5Instance.Vector;
    r: number;
    maxspeed: number;
    maxforce: number;
}

export interface FlockSketchProps {
    shouldUseWasm: boolean;
    numBoids: number;
}

export interface WithCanvas {
    canvas: HTMLCanvasElement;
}

declare global {
    interface Window {
        computationEngine: any;
    }
}
