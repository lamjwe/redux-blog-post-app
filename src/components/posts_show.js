import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    static contextTypes = { 
        router: PropTypes.object
    };
    
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id).then(() => { 
            // blog post has been deleted, navigate the user to the index
            // navigate by calling this.context.router.push with the new path to navigate to
            this.context.router.push('/');
        });
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
                <Link to="/">Back To Index</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
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
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);