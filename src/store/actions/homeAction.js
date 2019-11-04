import {SET_NOTE} from './actionTypes';

export const setNote = note => {
  return {
    type: SET_NOTE,
    note: note,
  };
};
