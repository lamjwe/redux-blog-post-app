import React, { Component } from 'react';
import  { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    render() {
        // redux form is injecting some helpers onto this.props inside of this component
        // Same as: const handleSubmit = this.props.handleSubmit;
        //          const title = this.props.fields.title ... etc. 
        const { fields: {title, categories, content}, handleSubmit } = this.props; // this is what we want to call whenever the form is submitted.
        
        // console.log(title);
            //  ==> 
                // active:false
                // defaultChecked:false
                // defaultValue:undefined
                // dirty:falseinitialValue:undefined
                // invalid:false
                // name:"title"
                // onBlur:(event)
                // onChange:(event)
                // onDragStart:(event)
                // onDrop:(event)
                // onFocus:()
                // onUpdate:(event)
                // pristine:true
                // touched:false
                // valid:true
                // visited:false
                // __proto__:Object

        return (
            <form onSubmit={handleSubmit(this.props.createPost)}>  
                <h3>Create A New Post</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" {... title} /* destructuring the object, so every property of the title object shows up inside the input*//>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <input type="text" className="form-control" {... categories}/>
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea type="text" className="form-control" {... content}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

// redux form have the same behaviour as 'connect'. It can be used to inject the action creator into the component and create a container out of the component.
export default reduxForm({
    // where we pass in the configuration to redux form
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew);

// Difference between reduxForm and connect is that reduxForm has one additional argument to it, the configuration object.
// connect: first argument is mapStateToProps, second is mapDispatchToProps.
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps