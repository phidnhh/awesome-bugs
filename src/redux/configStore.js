import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import LoadingReducer from "./reducers/LoadingReducer";
import UserReducer from "./reducers/UserReducer";

//setup saga
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    LoadingReducer,
    UserReducer
});

const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export default store;
