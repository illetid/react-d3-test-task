import { combineReducers } from "redux";

import shapesReducer from "./shapesReducer";
import selectedShapeReducer from "./selectedShapeReducer";

export default combineReducers({
  shapes: shapesReducer,
  selectedShape: selectedShapeReducer
});
