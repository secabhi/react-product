import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from '../modules/common/reducer';
//import logger from 'redux-logger';

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(promiseMiddleware,thunk)
    )
);

export function getStore() {
    return store;
}