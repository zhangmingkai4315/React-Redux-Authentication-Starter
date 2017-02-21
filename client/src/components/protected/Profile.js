import React , {Component} from 'react'; // eslint-disable-line no-unused-vars
import * as actions from '../../actions/apiAction';
import { connect } from 'react-redux';


class Profile extends Component {
  constructor(props){
    super(props);
    this.renderVersion=this.renderVersion.bind(this);
  }
  componentDidMount() {
    this.props.fetchApiVersion();
  }
  renderVersion(){
    if(this.props.version){
      return(
        <p>当前api版本:{this.props.version}</p>
      );
    }
  }
  render(){
    return (
      <div>
          <h2>Profile</h2>
          {this.renderVersion()}
      </div>
    );
  }
}
function mapStateToProps({version}) {
  return{version};
}
export default connect(mapStateToProps,actions)(Profile);

