import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class PostsShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    render() {
        const { post } = this.props; // Same as: const post = this.props.post;

        // The component will first attempt to render, but the component does not actually 
        // have the data it needs to show yet. 
        // Whenever rendering a component, the component is not going to wait for the data 
        // to show up. The component is going to render immediately every time even if some props are not available.
        // Need to hanlde the case in which the data is not yet loaded but the component is trying to render itself.
        console.log(post);
        if (!post) {
            return <div>Loading ... </div>; // or can put a spinner 
        }

        return (
            <div>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

// Need to do a get request first to show post data.
// 1. Create action creator in actions/index.js
// 2. Grab FETCH_POST as action.type in reducer.
// 3. Make use of the action creator in posts_show, here. 
export default connect(mapStateToProps, { fetchPost })(PostsShow);