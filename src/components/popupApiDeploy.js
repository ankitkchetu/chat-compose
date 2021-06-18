import React from 'react';
import {Form,Button} from 'react-bootstrap';
export class PopupApiDeploy extends React.Component {
      constructor(props) {
        super(props)
        this.state ={
            configUpdate: props.configUpdate,
            _apiDeploy:props._apiDeploy,
            bot:props.bot,
            bot_id:props.bot_id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.bot_id){
          
          this.setState({
            bot_id:nextProps.bot_id,
          });
        }
      }
      handleSubmit(event){
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          event.preventDefault();
          event.stopPropagation();
          let value = {bot_id:"",id:"chat",deploy:1}
          if(document.getElementsByName('bot_id')[0].value){
            value.bot_id=document.getElementsByName('bot_id')[0].value;
          }
          if(document.getElementsByName('id')[0].value){
            value.id=document.getElementsByName('id')[0].value;
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
          
                <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                        <h1>Deployment Settings</h1>
                        <Form onSubmit={this.handleSubmit} id="form-input">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className = "inputlabel">id</Form.Label>
                            <Form.Control name = "id" pattern= "[a-z0-9-]+" value = {this.state.bot.id} title="Only [a-z0-9] character allowed" className = "dropme2" type="text" required/>
                            {/* <Form.Label className = "inputlabel">Version</Form.Label>
                            <Form.Control name = "bot_diagram_schema_version" className = "dropme2" type="text" required/> */}
                            <Form.Label className = "inputlabel">bot_id</Form.Label>
                            <Form.Control name = "bot_id" value = {this.state.bot.bot_id} className = "dropme2" type="text" required/>
                            
                        </Form.Group>
                        <div className="react-confirm-alert-button-group">
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
  export default PopupApiDeploy