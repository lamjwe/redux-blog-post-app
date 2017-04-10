import React, { Component } from 'react';
import  { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

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
                <div className={ `form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {... title} /* destructuring the object, so every property of the title object shows up inside the input*//>
                    <div className="text-help"> 
                        { title.touched ? title.error : '' /* touched is false until the user touches the field in some way*/}
                    </div>
                </div>
                <div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {... categories}/>
                    <div className="text-help"> 
                        { categories.touched ? categories.error : '' /* touched is false until the user touches the field in some way*/}
                    </div>
                </div>
                <div className={ `form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea type="text" className="form-control" {... content}/>
                    <div className="text-help"> 
                        { content.touched ? content.error : '' /* touched is false until the user touches the field in some way*/}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username';
    }

    if (!values.categories) {
        errors.categories = 'Enter categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content';
    }

    // Redux form validation: 
    // An object is returned from the validate function. If the object have a key that matches 
    // one of our fields, and that key have an object tied to it (string or true or anything), redux form
    // assumes that the form is not valid, so it does not allow you to submit the form. It then also adds
    // a couple more properties to the fields configuration. 
    return errors;
}
// redux form have the same behaviour as 'connect'. It can be used to inject the action creator into the component and create a container out of the component.
export default reduxForm({
    // where we pass in the configuration to redux form
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate // the function we just created.
}, null, { createPost })(PostsNew);

// Difference between reduxForm and connect is that reduxForm has one additional argument to it, the configuration object.
// connect: first argument is mapStateToProps, second is mapDispatchToProps.
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps