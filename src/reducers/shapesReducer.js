import {
  GET_SHAPES,
  ADD_SHAPE,
  DELETE_SHAPE,
  MODIFY_SHAPE
} from "../actions/types";

const updateObjectInArray = (array, payload) => {
  console.log(payload);

  return array.map(item => {
    if (item.id !== payload.id) {
      return item;
    }

    return {
      ...item,
      ...payload
    };
  });
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_SHAPES:
      return state;
    case ADD_SHAPE:
      return [...state, action.payload];
    case DELETE_SHAPE:
      return state.filter(s => s.id !== action.payload.id);
    case MODIFY_SHAPE:
      return updateObjectInArray(state, action.payload);
    default:
      return state;
  }
};
