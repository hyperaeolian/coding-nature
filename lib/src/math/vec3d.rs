use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone, Copy)]
pub struct Vec3D {
    pub x: f64,
    pub y: f64,
    pub z: f64
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone, Copy)]
pub struct Boid {
    pub position: Vec3D,
    pub velocity: Vec3D,
    pub acceleration: Vec3D,
    pub max_speed: u8,
    pub max_force: f32,
    pub size: i32
}

impl Boid {
    pub fn new(position: Vec3D, velocity: Vec3D, acceleration: Vec3D) -> Boid {
        Boid {
            position,
            velocity,
            acceleration,
            max_speed: 3,
            max_force: 0.05,
            size: 3
        }
    }

    pub fn clone(boid: &Boid) -> Boid {
        Boid {
            position: boid.position,
            velocity: boid.velocity,
            acceleration: boid.acceleration,
            max_force: boid.max_force,
            max_speed: boid.max_speed,
            size: boid.size
        }
    }
}

impl Vec3D {
    pub fn new(x: f64, y: f64, z: f64) -> Vec3D {
        Vec3D {
            x,
            y,
            z
        }
    }
}

pub fn clone(vec_to_clone: &Vec3D) -> Vec3D {
    Vec3D {
        x: vec_to_clone.x,
        y: vec_to_clone.y,
        z: vec_to_clone.z
    }
}

pub fn add(vec_a: &Vec3D, vec_b: &Vec3D) -> Vec3D {
    Vec3D {
        x: vec_a.x + vec_b.x,
        y: vec_a.y + vec_b.y,
        z: vec_a.z + vec_b.z
    }
}

pub fn subtract(vec_a: &Vec3D, vec_b: &Vec3D) -> Vec3D {
    Vec3D {
        x: vec_a.x - vec_b.x,
        y: vec_a.y - vec_b.y,
        z: vec_a.z - vec_b.z
    }
}

pub fn mag_sq(vec: &Vec3D) -> f64 {
    vec.x * vec.x + vec.y * vec.y + vec.z * vec.z
}

pub fn magnitude(vec: &Vec3D) -> f64 {
    mag_sq(vec).sqrt()
}

pub fn dist(vec_a: &Vec3D, vec_b: &Vec3D) -> f64 {
    magnitude(&subtract(vec_a, vec_b))
}

pub fn multiply_by_scalar(vec: &Vec3D, scalar: f64) -> Vec3D {
    Vec3D {
        x: vec.x * scalar,
        y: vec.y * scalar,
        z: vec.z * scalar
    }
}

pub fn divide_by_scalar(vec: &Vec3D, scalar: f64) -> Vec3D {
    Vec3D {
        x: vec.x / scalar,
        y: vec.y / scalar,
        z: vec.z / scalar
    }
}

pub fn normalize(vec: &Vec3D) -> Vec3D {
    let magnitude = magnitude(vec);
    if magnitude != 0.0 {
        multiply_by_scalar(&vec, 1f64 / magnitude)
    } else {
        clone(&vec)
    }
}

pub fn limit(vec: &Vec3D, max: f64) -> Vec3D {
    let mut constrained_vector: Vec3D = clone(&vec);
    let magnitude_squared: f64 = mag_sq(&vec);
    let max_squared: f64 = max * max;

    if magnitude_squared > max_squared {
        constrained_vector = divide_by_scalar(&constrained_vector, magnitude_squared.sqrt());
        constrained_vector = multiply_by_scalar(&constrained_vector, max);
    }

    constrained_vector
}