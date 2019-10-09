import React from "react";
import { connect } from "react-redux";
import { selectShape } from "../actions";

const ShapesList = ({ shapes, selectShape }) => {
  if (!shapes) {
    return null;
  }
  const shapeListItem = shape => {
    return (
      <li onClick={() => selectShape(shape)} key={shape.id}>
        Ellipse [id: {shape.id}]
      </li>
    );
  };
  return (
    <div>
      <h3> List of shapes (click to select and view details) </h3>
      <ul>{shapes.map(shape => shapeListItem(shape))}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    shapes: state.shapes
  };
};
export default connect(
  mapStateToProps,
  { selectShape }
)(ShapesList);
