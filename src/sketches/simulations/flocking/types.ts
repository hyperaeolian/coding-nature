export interface Vec3D {
    x: number;
    y: number;
    z: number;
};

export interface Boid {
    acceleration: Vec3D;
    velocity: Vec3D;
    position: Vec3D;
    size: number;
    max_speed: number;
    max_force: number;
};

