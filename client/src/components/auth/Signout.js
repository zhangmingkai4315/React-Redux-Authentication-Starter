import React , { Component } from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authAction';

class Signout extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.signoutUser();
  }
  render(){
    return (
    <div>您已退出登陆状态，感谢您的访问</div>
    );
  }
}

export default connect(null,actions)(Signout);