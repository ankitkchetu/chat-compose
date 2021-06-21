import React from 'react'
import {Leftcard} from './Leftcard'
import CanvasDiv from './CanvasDiv'




class Home extends React.Component {
    constructor(props) {
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        let token = query.get('bot_id')||null;
        this.state = {
            bot_id:token
        };
      }
    componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      let token = query.get('bot_id');
        if(token){
            this.setState({bot_id:token});
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
