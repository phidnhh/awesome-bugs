import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

//setup saga
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    
});

const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export default store;
