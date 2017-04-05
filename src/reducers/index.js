import { combineReducers } from 'redux';
import PostReducer from './reducer_posts';

// import redux-form, grab the reducer property off of it and then create a variable with it named formReducer. 
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;
