import React , {Component} from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import {Link} from 'react-router';

class Header extends Component{
  constructor(props){
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }
  renderHeader(){
    if(this.props.auth&&this.props.auth.authenticate){
      return [
        <li key="1"><Link className = "nav-link"  to="/profile">个人页面</Link></li>,
        <li key="2"><Link className = "nav-link" to="/signout">退出</Link></li>];
    }else{
      return [
        <li key="1"><Link className = "nav-link" to="/signin">登录</Link></li>,
        <li key="2"><Link className = "nav-link" to="/signup">注册</Link></li>];
    }
  }
  render(){
    return (
    <nav className="navbar navbar-default">
      <ul className="nav nav-pills">
          <li key="0"><Link to="/">主页</Link></li>
          {this.renderHeader()}
      </ul>
    </nav>
    );
  }
}
function mapStateToProps(state){
  return {
    auth:state.auth
  };
}
export default connect(mapStateToProps)(Header);
