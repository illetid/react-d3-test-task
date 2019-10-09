import {
  GET_SHAPES,
  ADD_SHAPE,
  SELECT_SHAPE,
  DELETE_SHAPE,
  MODIFY_SHAPE
} from "./types";

export const getShapes = () => {
  return {
    type: GET_SHAPES
  };
};
export const addShape = Shape => {
  return {
    type: ADD_SHAPE,
    payload: Shape
  };
};

export const deleteShape = Shape => {
  return {
    type: DELETE_SHAPE,
    payload: Shape
  };
};

export const modifyShape = Shape => {
  return {
    type: MODIFY_SHAPE,
    payload: Shape
  };
};

export const selectShape = Shape => {
  return {
    type: SELECT_SHAPE,
    payload: Shape
  };
};
