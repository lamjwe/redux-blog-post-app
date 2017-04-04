import { FETCH_POSTS } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_POSTS:
            // take whatever the current state is, and add on all: action.payload.data.
            return { ...state, all: action.payload.data };
        default:
            return state;
    }
}