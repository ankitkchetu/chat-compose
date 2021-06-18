import React from 'react';
import {Form,Button} from 'react-bootstrap';
export class Popup extends React.Component {
      constructor(props) {
        super(props)
        this.state ={
            configUpdate: props.configUpdate,
        };
      }
      _download(data) {
            this.state.configUpdate(data);

        }
        handleFileRead (fileReader) {
            const content = fileReader.target.result;
            // console.log(content)
            this.state.configUpdate(JSON.parse(content));
            this.props.closePopup();
            // … do something with the 'content' …
          };
      handleFileChosen(evt){
            var files = evt.target.files; // FileList object

            // use the 1st file from the list
            let f = files[0];

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = this.handleFileRead.bind(this);
            // Read in the image file as a data URL.
            reader.readAsText(f);
    }
   
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          
                <div className="react-confirm-alert">
                    <div className="react-confirm-alert-body">
                        <h1>Import file</h1>
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className = "inputlabel">Upload File</Form.Label>
                            <Form.Control className = "dropme" type="file" accept='.json' placeholder="Upload Your file"  onChange={this.handleFileChosen.bind(this)} />
                            
                        </Form.Group>
                        <div className="react-confirm-alert-button-group">
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
  export default Popup