import * as p5Instance from "p5";
import { Vector } from "p5";

const DESIRED_SEPARATION = 25.0;
const NEIGHBOR_DISTANCE = DESIRED_SEPARATION * 2;

export default class Boid {

    private p5: p5Instance;
    private acceleration: p5Instance.Vector;
    public position: p5Instance.Vector;
    public velocity: p5Instance.Vector;
    private size: number;
    private max_speed: number;
    private max_force: number;

	constructor(x: number, y: number, ctx: p5Instance) {
        this.p5 = ctx;
        this.acceleration = this.p5.createVector(0, 0);
        this.velocity = Vector.random2D();
        this.position = this.p5.createVector(x, y);
        this.size = 3.0;
        this.max_speed = 3;
        this.max_force = 0.05;
	}
  
	run(boids: Boid[]) {
	  this.flock(boids);
	  this.updateLocation();
	  this.wraparoundOnBorderCollision();
	  this.render();
	}

	applyForce(force: p5Instance.Vector) {
	  this.acceleration.add(force);
	}
	
	flock(boids: Boid[]) {
	  let separation = this.separate(boids);
	  let alignment = this.align(boids);
	  let cohesion = this.cohesion(boids);
	  // Arbitrarily weight these forces
	  separation.mult(2.5);
	  alignment.mult(1.0);
	  cohesion.mult(1.0);
	  // Add the force vectors to acceleration
	  this.applyForce(separation);
	  this.applyForce(alignment);
	  this.applyForce(cohesion);
	}
	
	updateLocation() {
	  this.velocity.add(this.acceleration);
	  this.velocity.limit(this.max_speed);
	  this.position.add(this.velocity);
	  this.acceleration.mult(0);
	}
	
	// A method that calculates and applies a steering force towards a target
	// STEER = DESIRED MINUS VELOCITY
	seek(target: p5Instance.Vector) {
	  let desired = Vector.sub(target, this.position); // A vector pointing from the location to the target
	  // Normalize desired and scale to maximum speed
	  desired.normalize();
	  desired.mult(this.max_speed);
	  // Steering = Desired minus Velocity
	  let steer = Vector.sub(desired, this.velocity);
	  steer.limit(this.max_force); // Limit to maximum steering force
	  return steer;
	}
	
	// Draw boid as a circle
	render() {
	  this.p5.fill(127, 127);
	  this.p5.stroke(200);
	  this.p5.ellipse(this.position.x, this.position.y, 16, 16);
	}

	wraparoundOnBorderCollision() {
		const { width, height } = this.p5;
		let { x: posX, y: posY } = this.position;
		const size = this.size;
	
		if (posX < -size) {
			posX = width + size; 
		}
		if (posY < -size) {
			posY = height + size;
		}
		if (posX > width + size) {
			posX = -size;
		}
		if (posY > height + size) {
			posY = -size;
		}
		this.position.x = posX;
		this.position.y = posY;
	}
	
	// Separation
	// Method checks for nearby boids and steers away
	separate(boids: Boid[]) {
	  let steer = this.p5.createVector(0, 0);
	  let count = 0;
	  // For every boid in the system, check if it's too close
	  for (let i = 0; i < boids.length; i++) {
		const distance = Vector.dist(this.position, boids[i].position);
		// If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
		if ((distance > 0) && (distance < DESIRED_SEPARATION)) {
		  // Calculate vector pointing away from neighbor
		  let diff = Vector.sub(this.position, boids[i].position);
		  diff.normalize();
		  diff.div(distance); // Weight by distance
		  steer.add(diff);
		  count++;
		}
	  }
	  // Average -- divide by how many
	  if (count > 0) {
		steer.div(count);
	  }
	
	  if (steer.mag() > 0) {
		// Implement Reynolds: Steering = Desired - Velocity
		steer.normalize();
		steer.mult(this.max_speed);
		steer.sub(this.velocity);
		steer.limit(this.max_force);
	  }
	  return steer;
	}
	
	// Alignment
	// For every nearby boid in the system, calculate the average velocity
	align(boids: Boid[]) {
	  let sum = this.p5.createVector(0, 0);
	  let count = 0;
	  for (let i = 0; i < boids.length; i++) {
		const distance = Vector.dist(this.position, boids[i].position);
		if ((distance > 0) && (distance < NEIGHBOR_DISTANCE)) {
		  sum.add(boids[i].velocity);
		  count++;
		}
	  }
	  if (count > 0) {
		sum.div(count);
		sum.normalize();
		sum.mult(this.max_speed);
		let steer = sum.sub(this.velocity);
		steer.limit(this.max_force);
		return steer;
	  } else {
		return this.p5.createVector(0, 0);
	  }
	}
	
	// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
	cohesion(boids: Boid[]) {
	  let sum = this.p5.createVector(0, 0); // Start with empty vector to accumulate all locations
	  let count = 0;
	  for (let i = 0; i < boids.length; i++) {
		const distance = Vector.dist(this.position, boids[i].position);
		if ((distance > 0) && (distance < NEIGHBOR_DISTANCE)) {
		  sum.add(boids[i].position); // Add location
		  count++;
		}
	  }
	  if (count > 0) {
		sum.div(count);
		return this.seek(sum); // Steer towards the location
	  } else {
		return this.p5.createVector(0, 0);
	  }
	}  
  }