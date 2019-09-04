use crate::math::vec3d;
use crate::math::vec3d::{Vec3D, Boid};


pub fn separate_boids(current_boid: &Boid, all_boids: &Vec<Boid>) -> Vec3D {
    let desired_separation = 25.0;
    let mut steer = Vec3D { x: 0.0, y: 0.0, z: 0.0 };
    let mut count = 0;

    for neighbor in all_boids {
        let distance = vec3d::dist(
            &current_boid.position,
            &neighbor.position
        );

        if distance > 0.0 && distance < desired_separation {
            let mut difference = vec3d::subtract(
                &current_boid.position,
                &neighbor.position
            );
            difference = vec3d::normalize(&difference);
            difference = vec3d::divide_by_scalar(&difference, distance);
            steer = vec3d::add(&steer, &difference);
            count += 1;
        }
    }

    if count > 0 {
        steer = vec3d::divide_by_scalar(&steer, count as f64);
    }

    if vec3d::magnitude(&steer) > 0.0 {
        steer = vec3d::normalize(&steer);
        steer = vec3d::multiply_by_scalar(&steer, current_boid.max_speed as f64);
        steer = vec3d::subtract(&steer, &current_boid.velocity);
        steer = vec3d::limit(&steer, current_boid.max_force.into());
    }

    steer
}

pub fn align_boids(current_boid: &Boid, all_boids: &Vec<Boid>) -> Vec3D {
    let neighbor_distance  = 50.0;
    let mut sum            = Vec3D::new(0.0, 0.0, 0.0);
    let mut count          = 0;
    let mut aligned: Vec3D = Vec3D::new(0.0, 0.0, 0.0);

    for boid in all_boids {
        let distance = vec3d::dist(&current_boid.position, &boid.position);
        if distance > 0.0 && distance < neighbor_distance {
            sum = vec3d::add(&sum, &boid.position);
            count += 1;
        }
        if count > 0 {
            sum       = vec3d::divide_by_scalar(&sum, count as f64);
            sum       = vec3d::normalize(&sum);
            sum       = vec3d::multiply_by_scalar(&sum, current_boid.max_speed.into());
            let steer = vec3d::subtract(&sum, &current_boid.velocity);
            aligned   = vec3d::limit(&steer, current_boid.max_force.into());
        }
    }

    aligned
}

pub fn add_cohesion(current_boid: &Boid, all_boids: &Vec<Boid>) -> Vec3D {
    let neighbor_distance = 50.0;
    let mut sum = Vec3D::new(0.0, 0.0, 0.0);
    let mut count = 0;
    let mut cohesion = Vec3D::new(0.0, 0.0, 0.0);

    for boid in all_boids {
        let distance = vec3d::dist(&current_boid.position, &boid.position);
        if distance > 0.0 && distance < neighbor_distance {
            sum = vec3d::add(&sum, &boid.position);
            count += 1;
        }
    }

    if count > 0 {
        sum = vec3d::divide_by_scalar(&sum, count as f64);
        cohesion = steer_towards_location(&current_boid, &sum);
    }

    cohesion
}


pub fn steer_towards_location(current_boid: &Boid, target: &Vec3D) -> Vec3D {
    let target_location  = vec3d::subtract(&target, &current_boid.position);
    let desired_location = vec3d::multiply_by_scalar(
        &vec3d::normalize(&target_location),
        current_boid.max_speed.into()
    );

    let steer = vec3d::subtract(
        &desired_location,
        &current_boid.velocity
    );
    vec3d::limit(&steer, current_boid.max_force.into())
}

pub fn update_location(boid: &vec3d::Boid) -> Boid {
    let mut velocity = boid.velocity;
    velocity         = vec3d::add(&velocity, &boid.acceleration);
    velocity         = vec3d::limit(&velocity, boid.max_speed.into());
    let position     = vec3d::add(&boid.position, &velocity);
    let acceleration = vec3d::multiply_by_scalar(&boid.acceleration, 0.0);

    vec3d::Boid::new(position, velocity, acceleration)
}

pub fn apply_forces_to_boid(
    boid:       &vec3d::Boid,
    separation: &Vec3D,
    alignment:  &Vec3D,
    cohesion:   &Vec3D
) -> vec3d::Boid {
    let mut updated_boid = vec3d::Boid::clone(&boid);
    updated_boid.acceleration = vec3d::add(&updated_boid.acceleration, &separation);
    updated_boid.acceleration = vec3d::add(&updated_boid.acceleration, &alignment);
    updated_boid.acceleration = vec3d::add(&updated_boid.acceleration, &cohesion);
    updated_boid
}

pub fn wraparound_if_boid_is_off_screen(width: f64, height: f64, boid: &vec3d::Boid) -> Vec3D {
    let mut x_position = boid.position.x;
    let mut y_position = boid.position.y;

    let boid_is_too_far_left  = boid.position.x < (-boid.size).into();
    let boid_is_too_far_right = boid.position.x > (width as i32 + boid.size).into();
    let boid_is_too_far_down  = boid.position.y < (-boid.size).into();
    let boid_is_too_far_up    = boid.position.y > (height as i32 + boid.size).into();

    if boid_is_too_far_left {
        x_position = (width as i32 + boid.size).into();
    }
    if boid_is_too_far_down {
        y_position = (height as i32 + boid.size).into();
    }
    if boid_is_too_far_right {
        x_position = (-boid.size).into();
    }
    if boid_is_too_far_up {
        y_position = (-boid.size).into();
    }

    Vec3D::new(x_position, y_position, 0.0)
}


