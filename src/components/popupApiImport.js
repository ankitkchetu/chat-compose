import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
export class PopupApiImport extends React.Component {
      constructor(props) {
        super(props)
        this.state ={
            configUpdate: props.configUpdate,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleSubmit(event){
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          event.preventDefault();
          event.stopPropagation();
          let value = {bot_id:""}
          if(document.getElementsByName('bot_id')[0].value){
            value.bot_id=document.getElementsByName('bot_id')[0].value;
          }
          // value
          if(value.bot_id!==''){
            console.log(value);
            let Url = 'https://voicebot.ameyo.net:9075/api/v1/bot/'+value.bot_id+'/latest';
            let headers = {};
            axios.get(Url,{ headers })
          .then(response => {
            this.state.configUpdate(response.bot_diagram.graph);
            this.props.closePopup();
          }).catch(err=>{
            console.error(err);
            this.props.closePopup();
          });
          
          // this.state.configUpdate(value);
          // this.props.closePopup();
          }
        }
      }
   
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          
                <div class="react-confirm-alert">
                    <div class="react-confirm-alert-body">
                        <h1>Add Publish Settings</h1>
                        <Form onSubmit={this.handleSubmit} id="form-input">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className = "inputlabel">bot_id</Form.Label>
                            <Form.Control name = "bot_id" className = "dropme2" type="text" required/>
                            
                        </Form.Group>
                        <div class="react-confirm-alert-button-group">
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                            <Button variant="primary" type="button" onClick={this.props.closePopup}>
                                Close
                            </Button>
                        </div>
                       
                        </Form>
                        
                    </div>
                </div>
          </div>
        </div>
      );
    }
  }
  export default PopupApiImport