import {createStore, combineReducers} from 'redux';
import token from '../reducers/token';
import loading from '../reducers/loading';

const reducer = combineReducers({
  token,
  loading,
});

export default createStore(reducer);
