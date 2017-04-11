import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

// Link is a actual component. When it gets rendered, the Link component ends up as an 'a tag'.
import { Link } from 'react-router';

class PostsIndex extends Component {
    // => This is a lifecycle method. React will call this automatically whenever the component is about to be rendered
    // to the DOM for the first time. It will not be called on subsequent rerenders though.
    // => Because this will only be called once, this will be a good place to put the action creator to go fetch the data.
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={"posts/" + post.id}>
                        <span className="pull-xs-right">{post.categories}</span>
                        <strong>{post.title}</strong>
                    </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts.all };
}

// function mapDispatchToProps(dispatch) {
//     // This gives us access to this.props.fetchPosts
//     return bindActionCreators({ fetchPosts }, dispatch);
// }

// { fetchPosts: fetchPosts} => Shortcut. Just passing in an object that says fetchPosts.
// It's still going to give us access to this.props.fetchPosts() inside of the component, but 
// without the added boilerplate of mapDispatchToProps.
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);

// because { fetchPosts: fetchPosts } have the same name for key and value, we can even 
// shorten it to just { fetchPosts }. (ES6)