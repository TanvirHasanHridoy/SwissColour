import {SET_NOTE, SET_MOVIES} from '../actions/actionTypes';

const initialState = {
  notes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTE:
      return {
        ...state,
        notes: state.notes.concat(action.note),
      };
    default:
      return state;
  }
};

export default reducer;
