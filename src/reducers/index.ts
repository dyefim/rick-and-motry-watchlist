import { combineReducers } from '@reduxjs/toolkit';
import counter from './counter';
import episodes from './episodes';

export default combineReducers({
  counter,
  episodes,
});
