import React , { Component } from 'react'; // eslint-disable-line no-unused-vars
import {Field,reduxForm } from 'redux-form';
class Signin extends Component{
  constructor(props){
    super(props);
  }
  handleFormSubmit({email,password}){
    // console.log(email,password);

  }
  render(){
    const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
                <label>Email</label>
                <Field className="form-control" name="email" component="input" type="text"/>
            </fieldset>
            <fieldset className="form-group">
                <label>Password</label>
                <Field className="form-control" name="password" component="input" type="password"/>
            </fieldset>
            <button action="submit" className="btn btn-primary">Sing in</button>
        </form> 
    );
  }
}

export default reduxForm({
  form:'signin'
})(Signin);
