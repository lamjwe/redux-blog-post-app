import React, { Component, PropTypes } from 'react';
import  { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    // React router have a buildin method call 'Push'. Push can be called with a new path and the router 
    // will automatically navigate to that path and update the URL in the address bar.
    // The difficult part is getting access to the 'Push' helper method from react router. 
    // Getting access to the router is done through a property on our component called 'context'.
    // 'Context' in react is like props. It is information that is passed from some parent component to a 
    // child component. The difference between context and props is that context doesn't have to be 
    // deliberately (intentionally) passed from parent to child. 
    static contextTypes = { 
        // React interprets this object whenever an instance of post_new is created.
        // It is going to see that contextTypes is declared and it's going to see that we want to 
        // specifically get access to some property on the context called router.
        // React is going to then search all of this component's parents until it finds a component 
        // that has a piece of context called router. In this case, it is going to go all the way back up 
        // to the router inside the index file in home directory (line 28). 
        router: PropTypes.object
    };

    // In Summary:
    // This is really just giving us access to a property called this.context.router inside of our component.
    // It is like props, but a bit different. It needs to be declared that it want access to the router property.
    // React then checks through all of its parents until it finds it, and when it finds it, assign it to this.context.router
    // inside of this component. 
    // Try to avoid using context in general. The only time we really want to be using it is when working with the 
    // router. Router will then be used to call the push method.

    onSubmit(props) {
        // createPost is an action creator that creates a promise as its payload.
        // Whenver we call an action creator that creates a promise as its payload, this call right where
        // will return that same promise. So when that promise is resolved, it means that the new blog post was 
        // successfully created. This makes it a good location to make sure that the navigation occurs.
        this.props.createPost(props)
            .then(() => { 
                // blog post has been created, navigate the user to the index
                // navigate by calling this.context.router.push with the new path to navigate to
                this.context.router.push('/');
            });
    }

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
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>  
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