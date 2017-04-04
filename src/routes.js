import React from 'react';

// The Route object is used to define a match between a URL and a component.
// IndexRoute is a helper that behaves like a route but it will be shown whenever the URL
// matches up with a path defined by the parent but not one of the children.
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/posts_index';

// This matches the path of forward slash to the component of App.
// In other words, when the user is at the path, show the component App.
export default (
    <Route path="/" component={App}>
        <IndexRoute component={PostIndex} />
    </Route>
    
);

/* Nested Routes:
    const Greeting = () => {
        return <div>Hey there!</div>;
    }

    // App and Greeting are parent and child, not siblings. 
    // Therefore, need to make sure that App renders Greeting.
    // In App.js, need to add {this.props.children} in render()
    <Route path="/" component={App}>
        <Route path="greet" component={Greeting} />
        <Route path="greet2" component={Greeting} />
        <Route path="greet3" component={Greeting} />
    </Route>
    
    => /         App
       /greet    App, Greeting
       /greet2   App, Greeting
       /greet3   App, Greeting
    */