extern crate wasm_bindgen;

#[macro_use]
extern crate serde_derive;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use std::vec::Vec;

mod math;
use math::vec3d::{Boid, multiply_by_scalar};

mod simulations;
use simulations::flocking::{
    separate_boids,
    align_boids,
    add_cohesion,
    update_location,
    apply_forces_to_boid,
    wraparound_if_boid_is_off_screen
};

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn flock(width: f64, height: f64, boids_jsvalue: &JsValue) -> JsValue {
    let boids: Vec<Boid> = boids_jsvalue.into_serde().unwrap();
    let mut updated_boids: Vec<Boid> = Vec::new();

    for boid in &boids {
        let mut separation = separate_boids(&boid, &boids);
        let mut alignment  = align_boids(&boid, &boids);
        let mut cohesion   = add_cohesion(&boid, &boids);

        separation = multiply_by_scalar(&separation, 2.5);
        alignment  = multiply_by_scalar(&alignment,  1.0);
        cohesion   = multiply_by_scalar(&cohesion,   1.0);

        let mut updated_boid = apply_forces_to_boid(&boid, &separation, &alignment, &cohesion);
        updated_boid = update_location(&updated_boid);
        updated_boid.position = wraparound_if_boid_is_off_screen(
            width,
            height,
            &updated_boid
        );
        updated_boids.push(updated_boid);
    }

    JsValue::from_serde(&updated_boids).unwrap()
}
