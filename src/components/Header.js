import React , {Component} from 'react'; // eslint-disable-line no-unused-vars
import {Link} from 'react-router';
class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
    <nav className="navbar navbar-default">
        <ul className="nav nav-pills">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Singup</Link></li>
        </ul>
    </nav>
    );
  }
}

export default Header;
