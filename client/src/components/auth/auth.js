import React ,{ Component } from 'react';
import {connect} from 'react-redux';
export default (ComposedComponent)=>{
  class Authenticate extends Component {
    componentWillMount(){
      if(!this.props.auth.authenticate){
        this.context.router.push('/signin');
      }
    }
    componentWillUpdate(nextProps){
      if(!nextProps.auth.authenticate){
        this.context.router.push('/signin');
      }
    }
    render(){
      return <ComposedComponent {...this.props}/>;
    }
  }
  Authenticate.contextTypes={
    router:React.PropTypes.object
  };
  function mapStateToProps(state){
    return {
      auth:state.auth
    };
  }
  return connect(mapStateToProps)(Authenticate);
};