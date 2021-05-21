import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export class suggestionchip extends Component {
    constructor(props) {
        super(props)
        this.state ={
            element:props.element,
            updateNodeCb:props.updateNodeCb,
            clicked:'dataprop',
            nameArray:props.nameArray,
            rowChip:(props.element&&props.element.data.rowChip)||[{image:"",text:"",description:""}],
            theme:"light",
            language:"javascript",
            isEditorReady:false
        };
        this.updateText1 = this.updateText1.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(!this.state.element){
            this.setState({
                element:nextProps.element,
                updateNodeCb:nextProps.updateNodeCb,
                clicked:'dataprop',
                nameArray:nextProps.nameArray,
                rowChip:(nextProps.element&&nextProps.element.data.rowChip)||[{image:"",text:"",description:""}]

            });

            console.log('nextProps',nextProps);
        }
    }

    componentWillUpdate(prevProps, prevState){
        if(prevProps.element&&this.state.element&&(prevProps.element.id!==this.state.element.id)){
            this.setState({
                element:prevProps.element,
                updateNodeCb:prevProps.updateNodeCb,
                clicked:'dataprop',
                nameArray:prevProps.nameArray,
                rowChip:(prevProps.element&&prevProps.element.data.rowChip)||[{image:"",text:"",description:""}]

            });
        }
        
        console.log('nextPropswill',prevProps,prevState,this.state);
    }
    handleInputChange (e, index){
        const { name, value } = e.target;
        const list = [...this.state.rowChip];
        list[index][name] = value;
        this.setState({rowChip:list});
        if(this.state.element.data.subtype==='suggestionchip'||this.state.element.data.subtype==='carousel'){
            let a = {rowChip:list};
            let obj = Object.assign({}, this.state.element.data, a);
            this.setState({element:{...this.state.element,data:{...obj}}}); 
        }
      };
     
      // handle click event of the Remove button
    handleRemoveClick(index){
        const list = [...this.state.rowChip];
        list.splice(index, 1);
        this.setState({rowChip:list});
      };
     
      // handle click event of the Add button
    handleAddClick() {
        this.setState({rowChip:[...this.state.rowChip, { image: "", text: "",description:"" }]});
      };

    _handleClick(evt){
        this.setState({clicked:evt.target.id})
    }

    _handleClickClose(evt){
        console.log('clled');
        this.setState({clicked:'dataprop',element:null})
    }
        
    handlerChange(evt){
        document.getElementById('propwrap').classList.add("editMark");
        if(evt.target.id==='id_label'){
        this.setState({element:{...this.state.element,label:evt.target.value,data:{...this.state.element.data,label:evt.target.value}}});
        }else{
            let a = {};
            if(evt.target.id==='var_name'){
                a[evt.target.id]=evt.target.value.toLowerCase();
            }else{
                a[evt.target.id]=evt.target.value;  
            }
            
            var obj = Object.assign({}, this.state.element.data, a);
            
            this.setState({element:{...this.state.element,data:{...obj}}}); 
        }
    }
    updateText1 (evt) {
        // this.setState({clicked:true});
        if(this.state.element){
            
           console.log('called');
            console.log('inside',this.state.element);
            if(this.state.nameArray.name.has(this.state.element.data.var_name)&&this.state.nameArray.name.get(this.state.element.data.var_name)!==this.state.element.id){
                confirmAlert({
                    title: 'Alert',
                    message: "You Can't use same name. As this Name Already used in "+this.state.nameArray.name.get(this.state.element.data.var_name),
                    buttons: [
                      {
                        label: 'Ok'
                      }
                    ]
                  });
                return true;
            }else{
                let elemetOld = this.props.element;
                console.log('ankit',elemetOld.id);
                let newLabel = this.state.element;
                let eleName = this.state.nameArray.id.get(this.state.element.id);
                this.state.nameArray.id.delete(this.state.element.id);
                this.state.nameArray.name.delete(eleName);
                this.state.nameArray.name.set(this.state.element.data.var_name,this.state.element.id);
                this.state.nameArray.id.set(this.state.element.id,this.state.element.data.var_name);
                
                this.setState({element:newLabel});
                
                this.state.updateNodeCb(elemetOld,newLabel,(elemetOld.data.type==='node'?0:1));
            }
            
            
        }else{
            console.log('empty',this.props);
        }
        this.setState({element:null});
        document.getElementById('propwrap').classList.remove("editMark");

        return true
    }
    handleChangeSpace(e) {
        if (e.key === " ") {
            e.preventDefault();
          }
      };
    handleChange(e){
        let a = {};
        a[e.target.id]=e.target.value;
        
        var obj = Object.assign({}, this.state.element.data, a);
        console.log(obj);
        this.setState({element:{...this.state.element,data:{...obj}}}); 
        // this.setState({selectValue:e.target.value});
    }
    handleEditorDidMount() {
        this.setState({isEditorReady:true});
      }
    render() {
        return (
            <div id="propwrap" className={(this.state.element&&this.state.element.data)?"itson":""}>
                    <div id="properties" className={(this.state.element&&this.state.element.data)?"expanded":''}>
                        <div id="close" onClick={this._handleClickClose.bind(this)}>
                            <img src="assets/close.svg" alt="close"/>
                        </div>
                        <p id="header2">Properties</p>
                        <div id="propswitch">
                            <div id="dataprop" className={this.state.clicked==='dataprop' ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>Data</div>
                            <div id="alertprop" className={this.state.clicked==='alertprop' ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>Configuration</div>
                            <div id="logsprop" className={this.state.clicked==='logsprop' ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>Logs</div>
                        </div>
                        <div className={this.state.clicked==='dataprop' ? 'proplist' : "proplist hidden"}>
                            <p className="inputlabel">Message Body</p>
                            <textarea className="dropmetextarea" id='description' value={(this.state.element&&this.state.element.data&&this.state.element.data.description)||''} onChange={this.handlerChange.bind(this)}></textarea>
                            {(this.state.element&&this.state.element.data)&&(this.state.element.data.subtype==='suggestionchip')&&this.state.rowChip.map((x, i) => {
                                    return (
                                    <div key={`card_`+i} className="box">
                                        <p className="inputlabel">Display Text</p>
                                        <input
                                        className="dropme"
                                        name="text"
                            placeholder="Enter Suggestion Text  Max 25 Char"
                                        value={x.text}
                                        maxLength="25"
                                        autoComplete="off"
                                        onChange={e => this.handleInputChange(e, i)}
                                        />
                                        <p className="inputlabel">Postback Text</p>
                                        <input
                                        className="dropme"
                                        name="description"
                            placeholder="Enter Postback Text  Max 25 Char"
                                        value={x.description}
                                        autoComplete="off"
                                        maxLength="25"
                                        onKeyDown={this.handleChangeSpace.bind(this)}
                                        onChange={e => this.handleInputChange(e, i)}
                                        />
                                        <div className="btn-box">
                                        {this.state.rowChip.length !== 1 && <button
                                            className="mr10"
                                            onClick={() => this.handleRemoveClick(i)}>Remove</button>}
                                        {this.state.rowChip.length - 1 === i&&this.state.rowChip.length <= 8 && <button onClick={this.handleAddClick.bind(this)}>Add</button>}
                                        </div>
                                    </div>
                                    );
                                })}
                            
                            {/* <p className="inputlabel">Check properties</p>
                            {JSON.stringify(this.state.element)}
                            <div className="dropme">All<img src="assets/dropdown.svg" alt="all"/></div>
                            <div className="checkus"><img src="assets/checkon.svg" alt="checkon"/><p>Log on successful performance</p></div>
                            <div className="checkus"><img src="assets/checkoff.svg" alt="checkoff"/><p>Give priority to this block</p></div> */}
                        </div>
                        <div className={this.state.clicked==='alertprop' ? 'proplist' : "proplist hidden"}>
                            <p className="inputlabel">Name</p>
                            {this.state.nameArray&&this.state.nameArray.name.size}
                            <input className="dropme" id='var_name' type="text" value={(this.state.element&&this.state.element.data&&this.state.element.data.var_name)} onChange={this.handlerChange.bind(this)}/>
                            
                            
                            <div className="checkus"><p></p></div>
                             
                        </div>
                        <div className={this.state.clicked==='logsprop' ? 'proplist' : "proplist hidden"}>
                            <div>
                            
                            </div>
                        </div>
                        <div id="divisionthing"></div>
                        <div id="Saveblock" onClick={this.updateText1.bind(this)}>Save</div>
                    </div>
                </div>
        );
    }
    
}
export default suggestionchip