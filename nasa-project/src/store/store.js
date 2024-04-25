import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk';
import task from '../reducers/TaskReducer';
import markers from '../reducers/MarkersReducer';
import random from '../reducers/RandomReducer';

const state = {
    tasks: [],
    markers: [],
    randomMarkers: []
}

const bigreducers = combineReducers({
    tasks: task,
    markers: markers,
    randomMarkers: random
});

export const store = createStore(bigreducers, state, applyMiddleware(thunk))
