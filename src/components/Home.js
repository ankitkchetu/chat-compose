import React from 'react'
import {Leftcard} from './Leftcard'
import CanvasDiv from './CanvasDiv'




class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bot_id:(this.props.match)?this.props.match.params.bot_id:null
        };
      }
    componentDidMount() {
        if(this.props.match.params.bot_id){
            this.setState({bot_id:this.props.match.params.bot_id})
        }
    }
  
  render() {
    return (
      <div>
        <Leftcard />
        <CanvasDiv bot_id={this.state.bot_id}/>
      </div>  
    )
  }
}

export default Home;
