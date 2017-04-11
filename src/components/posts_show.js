import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class PostsShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    render() {
        return <div>Show post {this.props.params.id}</div>;
    }
}

// Need to do a get request first to show post data.
// 1. Create action creator in actions/index.js
// 2. Grab FETCH_POST as action.type in reducer.
// 3. Make use of the action creator in posts_show, here. 
export default connect(null, { fetchPost })(PostsShow);