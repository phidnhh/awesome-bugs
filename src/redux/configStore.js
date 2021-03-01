import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import LoadingReducer from "./reducers/LoadingReducer";
import UserReducer from "./reducers/UserReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import DrawerReducer from "./reducers/DrawerReducer";
import TaskReducer from "./reducers/TaskReducer";
import CommentReducer from "./reducers/CommentReducer";

//setup saga
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    LoadingReducer,
    UserReducer,
    ProjectReducer,
    DrawerReducer,
    TaskReducer,
    CommentReducer
});

const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export default store;
