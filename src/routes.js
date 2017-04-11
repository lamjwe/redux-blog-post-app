import React from 'react';

// The Route object is used to define a match between a URL and a component.
// IndexRoute is a helper that behaves like a route but it will be shown whenever the URL
// matches up with a path defined by the parent but not one of the children.
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// This matches the path of forward slash to the component of App.
// In other words, when the user is at the path, show the component App.
export default (
    <Route path="/" component={App}>
        <IndexRoute component={PostsIndex} />
        <Route path="posts/new" component={PostsNew} />
         {/* React Router will automatically parse this URL and it will 
         pass into the PostsShow component a special prop. (this.props.params.id) */}
        <Route path="posts/:id" component={PostsShow} /> 
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