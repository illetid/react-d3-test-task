import {
  GET_SHAPES,
  ADD_SHAPE,
  DELETE_SHAPE,
  MODIFY_SHAPE,
  SELECT_SHAPE
} from "../actions/types";

const updateObjectInArray = (array, payload) => {
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

export default (state = { list: [], active: null }, action) => {
  switch (action.type) {
    case GET_SHAPES:
      return state;
    case ADD_SHAPE:
      return { ...state, list: [...state.list, action.payload] };
    case DELETE_SHAPE:
      return {
        ...state,
        list: state.list.filter(s => s.id !== action.payload.id)
      };
    case MODIFY_SHAPE:
      return {
        ...state,
        list: updateObjectInArray(state.list, action.payload)
      };
    case SELECT_SHAPE:
      return { ...state, active: action.payload };
    default:
      return state;
  }
};
