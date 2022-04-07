import { combineReducers } from "redux";
import auth from './authReduce';
import quest from './questReduce'


export default combineReducers({
    auth,
    quest
})