import React , { Component } from 'react'; // eslint-disable-line no-unused-vars
import {Field,reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authAction';

const renderField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <input className="form-control" {...input} type={type}/>
    {touched && ((error && <span className="error-message">{error}</span>))}
  </div>
);
class Signup extends Component{
  constructor(props){
    super(props);
    this.renderAlert=this.renderAlert.bind(this);
  }
  handleFormSubmit({email,password}){
    // console.log(email,password,passwordConfirm);
    // 验证用户输入已通过redux-form validate完成，可以直接发送到服务器
    this.props.actions.signupUser({email,password});
  }
  renderAlert(){
    if(this.props.errorMessage){
      return (
      <div className="alert alert-danger">
        {this.props.errorMessage}
      </div>);
    }
  }



  render(){
    const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
                <label>Email</label>
                <Field className="form-control" name="email" component={renderField} type="text"/>
            </fieldset>
            <fieldset className="form-group">
                <label>Password</label>
                <Field className="form-control" name="password"  component={renderField}type="password"/>
            </fieldset>
            <fieldset className="form-group">
                <label>Confirm Password</label>
                <Field className="form-control" name="passwordConfirm" component={renderField} type="password"/>
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sing in</button>
        </form> 
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = '邮件不能为空';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '无效的邮箱格式';
  }
  if (!values.password) {
    errors.password = '密码不能为空';
  }else if(values.password&&values.password.length<6){
    errors.password = '密码不能低于６位';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = '确认密码不能为空';
  }else if(values.passwordConfirm&&values.passwordConfirm !== values.password){
    errors.passwordConfirm = '两次输入密码不一致';
  }
  return errors;
};
const SingUpForm =  reduxForm({
  form:'signup',
  validate
})(Signup);
function mapStateToProps(state){
  return {
    errorMessage:state.auth.error
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actions,dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SingUpForm);