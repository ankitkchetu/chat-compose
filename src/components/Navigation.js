import React, {Component} from 'react';
import {Popup} from './popup'
import {PopupApi} from './popupApi'
import {PopupApiImport} from './popupApiImport'
export class Navigation extends Component {
  constructor(props) {
      super(props)
      this.state ={
          updateNodeCb: props.publishClick,
          updateNodeCbAPI: props.onPublishUsingApi,
          configUpdate: props.configUpdate,
          showPopup: false,
          PopupApi:false,
          PopupApiImport:false
      };
  }
  _download (evt) {
    this.state.updateNodeCb();

    return true
}

_apiPublish (data) {
  this.state.updateNodeCbAPI(data);
  return true
}
PopupApi() {
  this.setState({
    PopupApi: !this.state.PopupApi
  });
}
PopupApiImport() {
  this.setState({
    PopupApiImport: !this.state.PopupApiImport
  });
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
                <button id='publish' onClick={this.PopupApiImport.bind(this)}>Import Api</button>
                <div id="publish" onClick={this._download.bind(this)}>Download Config</div>
                <div id="publish" onClick={this.PopupApi.bind(this)}>Publish Using Api</div>
            </div>
            {this.state.showPopup ? 
              <Popup
                text='Close Me'
                configUpdate={this.state.configUpdate}
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
            {this.state.PopupApi ? 
              <PopupApi
                text='Close Me'
                configUpdate={this.state.updateNodeCbAPI}
                closePopup={this.PopupApi.bind(this)}
              />
              : null
            }
            {this.state.PopupApiImport ? 
              <PopupApiImport
                text='Close Me'
                configUpdate={this.state.configUpdate}
                closePopup={this.PopupApiImport.bind(this)}
              />
              : null
            }
          </div>
        );
    }
}
export default Navigation