import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
// other reducers needs to import here
const rootReducer = combineReducers({
    userInfo: userReducer,
    projectInfo: projectReducer,
    // if there are other reducers , we can add here one by one
});
export default rootReducer;