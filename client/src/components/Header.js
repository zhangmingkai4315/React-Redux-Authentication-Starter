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
      return(
        <ul className="nav nav-pills">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      );
    }else{
      return (
        <ul className="nav nav-pills">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signin">Sign in</Link></li>
          <li><Link to="/signup">Sing up</Link></li>
        </ul>);
    }
  }
  render(){
    return (
    <nav className="navbar navbar-default">
      {this.renderHeader()}
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
