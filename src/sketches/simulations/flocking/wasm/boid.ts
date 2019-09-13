import { Vec3D, WasmBoid } from "../types";
import * as p5Instance from "p5";

export function createBoid(positionX: number, positionY: number): WasmBoid {
	return {
		acceleration: createVector({}),
		velocity: createRandomVector(),
		position: createVector({
			x: positionX,
			y: positionY
		}),
		size: 3.0,
		max_speed: 3,
		max_force: 0.05
	};
};

export function renderBoid(p5: p5Instance, boid: WasmBoid){
	const direction = Math.atan2(boid.velocity.y, boid.velocity.x) + 90;
	const size = boid.size;
	p5.fill(100);
	p5.noStroke();
	p5.push();
		p5.translate(boid.position.x, boid.position.y);
		p5.rotate(direction);
		p5.beginShape();
			p5.vertex(0, -size * 4);
			p5.vertex(-size, size * 4);
			p5.vertex(size, size * 4);
		p5.endShape(p5.CLOSE);
	p5.pop();
}

function createVector({
	x = 0,
	y = 0,
	z = 0
}): Vec3D {
	return { x, y, z };
}

function createRandomVector(): Vec3D {
	const angle = Math.random() * (2 * Math.PI);
	return createVector({
		x: Math.cos(angle),
		y: Math.sin(angle)
	});
}
