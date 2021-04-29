import React, {Component} from 'react';
import {Popup} from './popup'
export class Navigation extends Component {
  constructor(props) {
      super(props)
      this.state ={
          updateNodeCb: props.publishClick,
          configUpdate: props.configUpdate,
          showPopup: false
      };
  }
  _download (evt) {
    this.state.updateNodeCb();

    return true
}
togglePopup() {
  this.setState({
    showPopup: !this.state.showPopup
  });
}
 
    render() {
        
        return (
          <div id="navigation">
            <div id="leftside">
              <div id="details">
                <div id="back">
                  <img src={"assets/arrow.svg"} alt="revskill10" />
                  </div>
                <div id="names">
                    <p id="title">BOT Designer</p>
                    <p id="subtitle">Drag and drop designer</p>
                </div>
              </div>            
            </div>
            <div id="centerswitch">
                <div id="leftswitch">Insurence Sales</div>
                <div id="rightswitch">Version 1</div>
            </div>
            <div id="buttonsright">
                {/* <div id="discard">Discard</div> */}
                <button id='discard1' onClick={this.togglePopup.bind(this)}>Upload File</button>
                <div id="publish" onClick={this._download.bind(this)}>Publish for testing</div>
            </div>
            {this.state.showPopup ? 
              <Popup
                text='Close Me'
                configUpdate={this.state.configUpdate}
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
          </div>
        );
    }
}
export default Navigation