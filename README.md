## Flocking Simulation

The [flocking simulation](https://www.red3d.com/cwr/boids/) is implemented both as a wasm module (in Rust code) and in javascript. You can toggle each implementation in the running app by clicking the `Use Wasm` checkbox.

Code for the Rust/Wasm implementation can be found in `/lib/src`.
The Javascript implementation is in `/src/sketches/flocking/js/boid.ts`

### More Info
- For flocking, Daniel Shiffman's [Nature of Code](https://natureofcode.com/book/chapter-6-autonomous-agents/) book is an excellent resource, and the Javascript implementation is based on the implementation in this book
- [Webassembly](https://webassembly.org/)
- [Rust](https://www.rust-lang.org/)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm init`

This performs several tasks:
- Installs dependencies
- Installs [wasm-pack](https://rustwasm.github.io/wasm-pack/). If you already have it install, click "N" when asked if you want to overrite your installation.
- Builds the wasm project in the ./lib directory.
- Links the wasm module to the top-level npm dependencies

### `npm run link:wasm`

Sets up the symlinks between the wasm module and the react-app

### `npm run build:wasm`

Builds the wasm project

