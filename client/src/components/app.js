import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Header from './Header';
export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children} 
      </div>
    );
  }
}
