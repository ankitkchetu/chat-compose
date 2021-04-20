import React, {Component} from 'react';
import Editor from "@monaco-editor/react";
export class EdgeProp extends Component {
    render() {
    console.log(this.state.element);
        return (
            <div id="propwrap" className={(this.state.element&&this.state.element.data)?"itson":""}>
                <div id="properties" className={(this.state.element&&this.state.element.data)?"expanded":''}>
                    <div id="close" onClick={this._handleClickClose.bind(this)}>
                        <img src="assets/close.svg" alt="close"/>
                    </div>
                    <p id="header2">Properties</p>
                    <div id="propswitch">
                        <div id="dataprop" className={this.state.clicked==='dataprop' ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>Data</div>
                        <div id="alertprop" className={this.state.clicked==='alertprop' ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>Alerts</div>
                        <div id="logsprop" className={this.state.clicked==='logsprop' ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>Logs</div>
                    </div>
                    <div className={this.state.clicked==='dataprop' ? 'proplist' : "proplist hidden"}>
                        <p className="inputlabel">Name</p>
                        <input className="dropme" id='id_label' type="text" value={(this.state.element&&this.state.element.data&&this.state.element.data.label)||''} onChange={this.handlerChange.bind(this)}/>
                        <p className="inputlabel">Edge Type</p>
                        <select className="dropme" id="edgeType"
                            value={(this.state.element&&this.state.element.data&&this.state.element.data.edgeType)||'Valueset'} 
                            onChange={this.handleChange.bind(this)} 
                        >
                            <option value="Valueset">Valueset</option>
                            <option value="Comparison">Comparison</option>
                        </select>
                        
                        {(() => {
                            if ((this.state.element&&this.state.element.data)&&this.state.element.data.edgeType==='Comparison') {
                            return (
                                <>
                                <p className="inputlabel">Comparison Type</p>
                                <select className="dropme" id="comparisonOperator"
                                    value={(this.state.element&&this.state.element.data&&this.state.element.data.comparisonOperator)||'=='} 
                                    onChange={this.handleChange.bind(this)} 
                                >
                                    <option value="<=">&#60;=</option>
                                    <option value="==">==</option>
                                    <option value="!=">!=</option>
                                    <option value="=>">=></option>
                                    <option value=">">&#62;</option>
                                    <option value="<">&#60;</option>
                                </select>
                                <p className="inputlabel">Comparison Value</p>
                                <input className="dropme" id='comparisonValue' type="text" value={(this.state.element&&this.state.element.data&&this.state.element.data.comparisonValue)||''} onChange={this.handlerChange.bind(this)}/>

                                </>
                            )
                            } else {
                            return (
                                <></>
                            )
                            }
                        })()}
                        {/* <p className="inputlabel">Check properties</p>
                        {JSON.stringify(this.state.element)}
                        <div className="dropme">All<img src="assets/dropdown.svg" alt="all"/></div>
                        <div className="checkus"><img src="assets/checkon.svg" alt="checkon"/><p>Log on successful performance</p></div>
                        <div className="checkus"><img src="assets/checkoff.svg" alt="checkoff"/><p>Give priority to this block</p></div> */}
                    </div>
                    <div className={this.state.clicked==='alertprop' ? 'proplist' : "proplist hidden"}>
                        <div className="checkus"><p>Development inprogress</p></div>
                    </div>
                    <div className={this.state.clicked==='logsprop' ? 'proplist' : "proplist hidden"}>
                        <div className="checkus"><p>Development inprogress</p></div>
                    </div>
                    <div id="divisionthing"></div>
                    <div id="Saveblock" onClick={this.updateText1.bind(this)}>Save</div>
                </div>
            </div>
        );
    }
    
}
export default EdgeProp