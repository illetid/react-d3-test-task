import React from "react";
import { connect } from "react-redux";
import { deleteShape } from "../actions";

const SelectedShape = ({ shape, deleteShape }) => {
  if (!shape) {
    return <div>Draw something and select shape</div>;
  }

  return (
    <div>
      <h3> Details for: {shape.id}</h3>
      <p>
        cx {shape.cx} - cy {shape.cy}
      </p>
      <p>
        rx {shape.rx} - ry {shape.ry}
      </p>
      <p> Fill color : {shape.fill} </p>
      <p> Stroke color : {shape.stroke} </p>
      <p onClick={() => deleteShape(shape)}>x (click to remove)</p>
    </div>
  );
};

const mapStateToProps = state => {
  const active = state.shapes.list.find(
    shape => shape.id === state.shapes.active
  );

  return {
    shape: active
  };
};
export default connect(
  mapStateToProps,
  { deleteShape }
)(SelectedShape);
