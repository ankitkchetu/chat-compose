import React, {Component} from 'react';
import {Popup} from './popup'
import {PopupApi} from './popupApi'
import {PopupApiImport} from './popupApiImport'
import {PopupApiDeploy} from './popupApiDeploy'

export class Navigation extends Component {
  constructor(props) {
      super(props)
      this.state ={
          updateNodeCb: props.publishClick,
          updateNodeCbAPI: props.onPublishUsingApi,
          configUpdate: props.configUpdate,
          showPopup: false,
          PopupApi:false,
          PopupApiImport:false,
          bot:props.botParams,
          bot_id:props.bot_id
      };
  }
  componentWillReceiveProps(nextProps){
    console.log('hiiiiiANKITTT',nextProps);
        if(nextProps.bot_id){
          
          this.setState({
            bot_id:nextProps.bot_id,
          });
        }
  }
  _download (evt) {
    this.state.updateNodeCb();

    return true
}

_apiDeploy (data) {
  console.log(data);
  this.setState({bot:data});
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
PopupApiDeploy() {
  this.setState({
    PopupApiDeploy: !this.state.PopupApiDeploy
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
                  <img src={"/assets/arrow.svg"} alt="revskill10" />
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
                {this.state.bot&&this.state.bot.id ? <div id="publish" onClick={this.PopupApiDeploy.bind(this)}>Deploy</div>: null
                }
            </div>
            {this.state.showPopup ? 
              <Popup
                text='Close Me'
                bot_id={this.state.bot_id}
                configUpdate={this.state.configUpdate}
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
            {this.state.PopupApi ? 
              <PopupApi
                text='Close Me'
                bot_id={this.state.bot_id}
                configUpdate={this.state.updateNodeCbAPI}
                _apiDeploy={this.state._apiDeploy}
                closePopup={this.PopupApi.bind(this)}
              />
              : null
            }
            {this.state.PopupApiImport ? 
              <PopupApiImport
                text='Close Me'
                bot_id={this.state.bot_id}
                configUpdate={this.state.configUpdate}
                closePopup={this.PopupApiImport.bind(this)}
              />
              : null
            }
            {this.state.PopupApiDeploy ? 
              <PopupApiDeploy
                text='Close Me'
                bot_id={this.state.bot_id}
                bot={this.state.bot}
                configUpdate={this.state.updateNodeCbAPI}
                closePopup={this.PopupApiDeploy.bind(this)}
              />
              : null
            }
          </div>
        );
    }
}
export default Navigation