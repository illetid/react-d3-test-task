import { SELECT_SHAPE, DELETE_SHAPE } from "../actions/types";
export default (selectedShape = null, action) => {
  if (action.type === SELECT_SHAPE) {
    return action.payload;
  }
  if (action.type === DELETE_SHAPE && selectedShape.id === action.payload.id) {
    return null;
  }

  return selectedShape;
};
