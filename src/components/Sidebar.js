import React, { Component } from "react";
import SelectedShape from "./SelectedShape";
import ShapesList from "./ShapesList";
export default class Sidebar extends Component {
  render() {
    return (
      <div className="app__sidebar">
        Ellipses drawing app. You can use mouse to add some elipses and also you
        can move them on the canvas.
        <ShapesList></ShapesList>
        <SelectedShape></SelectedShape>
      </div>
    );
  }
}
