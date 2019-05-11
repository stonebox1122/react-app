import { createStore } from 'redux';
import counter from './reducers'
let store = createStore(counter);
export default store;
