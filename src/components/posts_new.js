import React, { Component } from 'react';
import  { reduxForm } from 'redux-form';

class PostsNew extends Component {
    render() {
        return (
            <form> 
                <h3>Create A New Post</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea type="text" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default reduxForm({
    // where we pass in the configuration to redux form
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content']
})(PostsNew);