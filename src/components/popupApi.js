import React from 'react';
import {Form,Button} from 'react-bootstrap';
export class PopupApi extends React.Component {
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
          let value = {bot_id:"",bot_type:"chat",description:"",bot_diagram_schema_version:"V1"}
          if(document.getElementsByName('bot_id')[0].value){
            value.bot_id=document.getElementsByName('bot_id')[0].value;
          }
          if(document.getElementsByName('bot_description')[0].value){
            value.description=document.getElementsByName('bot_description')[0].value;
          }
          // if(document.getElementsByName('bot_diagram_schema_version')[0].value){
          //   value.bot_diagram_schema_version=document.getElementsByName('bot_diagram_schema_version')[0].value;
          // }
          // console.log('value',value,document.getElementsByName('bot_description'));
          // value
          if(value.bot_id!==''){
          this.state.configUpdate(value);
          this.props.closePopup();
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
                            {/* <Form.Label className = "inputlabel">Version</Form.Label>
                            <Form.Control name = "bot_diagram_schema_version" className = "dropme2" type="text" required/> */}
                            <Form.Label className = "inputlabel">description</Form.Label>
                            <Form.Control name = "bot_description" className = "dropme2" type="text" required/>
                            
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
  export default PopupApi