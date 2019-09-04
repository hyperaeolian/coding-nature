import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const RootNode = document.getElementById("root");

ReactDOM.render(<h3>Loading</h3>, RootNode);

import("wasm-computation-engine")
.then(wasm => {
    window.computationEngine = wasm;
}).finally(() => {
    ReactDOM.unmountComponentAtNode(RootNode as Element)
    ReactDOM.render(<App />, RootNode);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
