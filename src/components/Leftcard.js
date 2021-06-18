import React, {Component} from 'react';
import {leftPalateConstants} from './constants/Constants';

const json = leftPalateConstants;
    
export class Leftcard extends Component {
    constructor(props) {
        super(props)
        this.state ={
            activeClass:'send',
            elemetArray: json,
            elemetOrig: json
        };
        this.filterList = this.filterList.bind(this);
    }
    filterList(event) {
        console.log('Event:', event.target.value)

        // let valueS = event.target.value;
        // if(valueS){
        //     console.log('valueS',valueS);
        //     let tempStor = json;
        //     // let returned_data = Object.entries(json).filter(([key, value]) => {
        //     //     let searchRes =  value.elements.filter((user)=>{
        //     //                 return user.label.toLowerCase().search(valueS) != -1;
        //     //         });
        //     //         tempStor[key]['elements']=searchRes;
        //     //         return tempStor;
        //     //   })
        //     Object.entries(tempStor).map(([key, value]) => {
        //         // console.log(key,value);
        //         tempStor[key].elements = tempStor[key].elements.filter((user)=>{
        //                             return user.label.toLowerCase().search(valueS) != -1;
        //                     });
        //     })
        //     // console.log(tempStor);
        //     // // let result = json.filter((user)=>{
        //     // //     console.log(user);
        //     // //         return user.name.toLowerCase().search(value) != -1;
        //     // // });
        //     this.setState({elemetArray:tempStor});
        // }else{
        //     console.log('valueS',json);
        //     this.setState({elemetArray:this.state.elemetOrig});
        // }
        // let users = this.state.users, result=[];
        // result = users.filter((user)=>{
        //     return user.name.toLowerCase().search(value) != -1;
        // });
        // this.setState({result});
    }
    _handleClick(evt){
        this.setState({activeClass:evt.target.id})
    }
    onDragStart(event, nodeType, title){
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('element', title);
        event.dataTransfer.effectAllowed = 'move';
    };
    render() {
        
        return (
            <div id="leftcard">
                <div id="closecard">
                    <img src="/assets/closeleft.svg" alt="close"/>
                </div>
                <p id="header">Blocks</p>
                <div id="search">
                    <img src="/assets/search.svg" alt="search"/>
                    <input type="text" placeholder="Search blocks" onChange={this.filterList}/>
                </div>
                <div id="subnav">
                    {Object.keys(this.state.elemetArray).map((e, i) => {
                    return(<div id={e} key={`menu_`+i} className={this.state.activeClass===e ? 'navactive side' : "navdisabled side"} onClick={this._handleClick.bind(this)}>{this.state.elemetArray[e].title}</div> )
                        
                    })}
                </div>
                {Object.keys(this.state.elemetArray).map((e, i) => {
                    return (
                        <div id={`blocklist${++i} ${e}`} key={`menu_compo`+i}  className={this.state.activeClass===e ? 'blocklist' : 'hidden blocklist'}>
                            {this.state.elemetArray[e].elements.map((item, iNested) => {
                            return (
                                <div key={`menu_compo`+i+'_'+iNested} className="blockelem create-flowy noselect" onDragStart={(event) => this.onDragStart(event, item.type, JSON.stringify(item))}  draggable>
                                    <div className="grabme">
                                        <img src="/assets/grabme.svg" alt="grabme"/>
                                    </div>
                                    <div className="blockin">
                                        <div className="blockico">
                                            <span></span>
                                            <img src={`/assets/${item.image}`} alt={item.image}/>
                                        </div>
                                        <div className="blocktext">
                                            <p className="blocktitle">{item.label}</p>
                                            <p className="blockdesc">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    );    
                })}
            </div>
        );
    }
}

export default Leftcard