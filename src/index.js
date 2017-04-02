import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, browserHistory } from 'react-router';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Imported Router and browserHistory up top.
// Router is the object that decides what react component we need to render whenever the URL changes.
// browserHistory is the obeject that tells React how to interpret changes to the URL.
//    - In this case, we are using browserHistory. But there are two other histories that we can use as well.
//    - This is seperate from the History library. 
//    - browserHistory means that whenever the URL updates, React Router is going to interpret everything after the protocol.
//      -> ex. http://www.blog.com/posts/5. browserHistory means that whenever "posts/5" of the URL changes, it will tell React Router to go update. 
//    - There is also hashHistory. So http://www.blog.com/#posts/5, hashHistory will use everything after the hash to keep track of what the user is 
//      currently looking at.
//    - There is also memoryHistory. which doesn't really use the URL at all for reading the history.
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} />
  </Provider>
  , document.querySelector('.container'));
