import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
    // => This is a lifecycle method. React will call this automatically whenever the component is about to be rendered
    // to the DOM for the first time. It will not be called on subsequent rerenders though.
    // => Because this will only be called once, this will be a good place to put the action creator to go fetch the data.
    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>List of blog posts</div>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     // This gives us access to this.props.fetchPosts
//     return bindActionCreators({ fetchPosts }, dispatch);
// }

// { fetchPosts: fetchPosts} => Shortcut. Just passing in an object that says fetchPosts.
// It's still going to give us access to this.props.fetchPosts() inside of the component, but 
// without the added boilerplate of mapDispatchToProps.
export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

// because { fetchPosts: fetchPosts } have the same name for key and value, we can even 
// shorten it to just { fetchPosts }. (ES6)