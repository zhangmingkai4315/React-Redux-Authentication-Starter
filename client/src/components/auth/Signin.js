import React , { Component } from 'react'; // eslint-disable-line no-unused-vars
import {Field,reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authAction';
class Signin extends Component{
  constructor(props){
    super(props);
  }
  handleFormSubmit({email,password}){
    // console.log(email,password);
    this.props.actions.signinUser({email,password});
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

const SingInForm =  reduxForm({
  form:'signin'
})(Signin);

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actions,dispatch)
  };
}

export default connect(null,mapDispatchToProps)(SingInForm);