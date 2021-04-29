import React, {Component } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
} from 'react-flow-renderer';

import {Propwrap} from './Propwrap'
import {Navigation} from './Navigation'

import {initialCanvasValue,NodeTypes} from './constants/Constants'; 
import ls from 'local-storage'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

          

const data = initialCanvasValue;

const nodeTypes = NodeTypes;


  let id = 1;
  let idedge = 0;
  const getId = () => `dndnode_${id++}`;
  const getIdEdge = function(flag=true) { 
    if(flag){
        return `edge_${++idedge}`
    }  
    return `edge_${idedge}`
    } ;
  
  
    export class ContentDiv extends Component {
      constructor(props) {
        super(props);
        this.state = {
          nodeName: null,
          reactFlowInstance:null,
          state:{element:null},
          elements:data,
          reactFlowWrapper:React.createRef()

        };
      }
      // componentDidUpdate(prevProps, prevState){
      // // componentWillReceiveProps = (nextProps) => {
      //   // if (nextProps.position !== this.props.position) {
      //   //   // this.moveMap(nextProps.position)
      //   // }
      //   console.log(prevState,'newtigger',prevProps);
      //   this.setState({elements:this.state.elements.map((el) => {

      //       if (this.state.nodeName && el.id === this.state.nodeName.id) {
      //         // it's important that you create a new object here in order to notify react flow about the change
      //         el.data = {
      //           ...el.data,
      //           label: this.state.nodeName.label,
      //           type: 'node',
      //         };
      //         el.label=this.state.nodeName.label;
      //       }
    
      //       return el;
      //     })}
      //   );
      // }
      
    onConnect(params){
      console.log("Connecting ", params.source, ' with node ', params.target)
      
      /***
       * After user input node every transition edges are intent.
       * From intents we could extract entities in NLP node.
       * All other edges are just flow. They dont do any operation other than direct transition.
       */
      let outputsAreIntents = false;
      for (let i = 0; i < this.state.elements.length; i++) {
        let element = this.state.elements[i];
        if (element.id === params.source && element.type === 'selectorUserInput') {
          console.log("Source node is user input node hence outputs are intents", element);
          outputsAreIntents = true;
        }
      }

      if (outputsAreIntents) {
        const incId =  '' + getIdEdge();
        let edgeLabel = 'Intent Name ' + incId;
        let edgeId = 'intent_' + incId;

        this.setState({elements:addEdge({ ...params, type: 'smoothstep', animated: false,label: edgeLabel, data:{label: edgeLabel,type:"edge"}, id: edgeId, arrowHeadType: 'arrow' }, this.state.elements)});
      } else {
        const incId =  '' + getIdEdge();
        let edgeLabel = '';
        let edgeId = 'flow_' + incId;

        this.setState({elements:addEdge({ ...params, type: 'smoothstep', animated: false,label: edgeLabel,data:{label: edgeLabel, type:"edge"}, id: edgeId, arrowHeadType: 'arrow' }, this.state.elements)});
      }
    };

    onElementsRemove(elementsToRemove){ 
      console.log('remove',elementsToRemove);
      if(elementsToRemove[0]['type']!=="selectorNodeStart"){
        this.setState({elements:removeElements(elementsToRemove, this.state.elements)});
      }else{
        confirmAlert({
          title: 'Alert',
          message: "You Can't remove start node.",
          buttons: [
            {
              label: 'Ok'
            }
          ]
        });
      }
      
    };  
    onLoad(_reactFlowInstance){
      console.log('load');
      this.resumeLoadContent();
      this.setState({reactFlowInstance:_reactFlowInstance});
      _reactFlowInstance.fitView();
    }

    resumeLoadContent(){
      if(ls.get("readLater")){
        confirmAlert({
          title: 'Confirm to Resume',
          message: 'Do you want to resume work from last drafted project.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                this.setState({elements:ls.get("readLater")});
                id=ls.get("node_id");
                idedge=ls.get("edge_id");
                console.log(id,idedge);
                this.callIntervalFunc();
              }
            },
            {
              label: 'No',
              onClick: () => {
                this.callIntervalFunc();
              }
            }
          ]
        });
      }else{
        this.callIntervalFunc()
      }
    }
    callIntervalFunc(){
      this.timer = setInterval(() => {
         
        ls.set('readLater', this.state.elements);
        ls.set('node_id', id);
        ls.set('edge_id', idedge);
        // console.log(123,this.state.reactFlowInstance.toObject().elements)
        // this.setState({ seconds: this.state.seconds + 1 });
      }, 5000);
    }

    onDragOver(event){
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      //console.log('sdsd');
    };
    onNodeDragStop(event,node){
      //console.log('sdsd',node);
    }
    
  
    onDrop(event){
      event.preventDefault();
      console.log('Element drop: ',this);
      const reactFlowBounds = this.state.reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const elementCreate = JSON.parse(event.dataTransfer.getData('element'));

      const position = this.state.reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      console.log("Element created: ",elementCreate);
      const newNode = {
        id: getId(),
        type,
        position,
        label: `${elementCreate.label}`,
        
        data: { label: `${elementCreate.label}`,description: `${elementCreate.nextNodeHints}`,'subtype':`${elementCreate.subtype||''}`,type:"node",'image':elementCreate.image,'class':elementCreate.class },
      };

      console.log('New node: ', newNode, event.dataTransfer);
  
      this.setState({elements:this.state.elements.concat(newNode)});
      };
      

    onElementClick(event, element){
      if(document.getElementsByClassName('selectedblock').length){
        let allElements = Array.from(document.getElementsByClassName('selectedblock'))
        for (let elementL of allElements) {
          elementL.classList.remove('selectedblock')
        }
        // document.getElementsByClassName('selectedblock').classList.remove("selectedblock");
      }
      
        console.log('called',element,event.target.parentElement.classList.add("selectedblock"));
        this.setState({element:element}); 
    }   

    onSaveAndPublishClick(event){
      // console.log(this.state.reactFlowInstance.toObject().elements);
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify(this.state.reactFlowInstance.toObject().elements)], {type: 'application/json'}); //pass data from localStorage API to blob
      element.href = URL.createObjectURL(textFile);
      element.download = "userFile.json";
      document.body.appendChild(element); 
      element.click();
    }  

    updateEdgeText(old,newEl,type){ 
        console.log('old,newEl,type',newEl);
          // if(type){
          //   this.setState({elements:updateEdge(old, newEl, this.state.elements)});
          //   console.log('calling',old, newEl,updateEdge(old, newEl, this.state.elements));
          // }else{
            this.setState({nodeName:newEl});
          // }
          this.setState({element:null});
          
        
      }
      componentDidMount() {

        
      }

    // componentDidMount() { console.log('called didMount'); }
    componentWillUpdate(prevProps, prevState) { 
      console.log('debug',this.state.nodeName,prevState.nodeName)
      if(this.state.nodeName!==prevState.nodeName){
        this.setState({elements:this.state.elements.map((el) => {

                if (el.id === prevState.nodeName.id) {
                  el = prevState.nodeName;
                  // it's important that you create a new object here in order to notify react flow about the change
                  // el.data = {
                  //   ...el.data,
                  //   label: prevState.nodeName.label,
                  //   type: 'node',
                  // };
                  // el.label=prevState.nodeName.label;
                }
        
                return el;
              })}
            );
            console.log('debugRunn',this.state.nodeName,prevState.nodeName)
      }
    }
    configUpdate(data1){
      this.setState({elements:data1});
      id=1;
      idedge=0;
      data1.map((e, i) => {
        console.log(e.data.type,e.id);
        let tempId = e.id.split('_');

        if(e.data.type==='node'){
          if(id<tempId[tempId.length-1]){
            id = parseInt(tempId[tempId.length-1]);
          }
          
        }else{
          if(idedge<tempId[tempId.length-1]){
            idedge = parseInt(tempId[tempId.length-1]);
          }
          
        }
        return true;
      });
    }
      
    render(){  
        // useEffect(() => {
        //   this.setState({elements:(els) =>
        //     els.map((el) => {
        //       if (el.id === this.state.nodeName.id) {
        //         // it's important that you create a new object here in order to notify react flow about the change
        //         el.data = {
        //           ...el.data,
        //           label: this.state.nodeName.label,
        //           type: 'node',
        //         };
        //         el.label=this.state.nodeName.label;
        //       }
      
        //       return el;
        //     })
        //   });
        // }, [this.state.nodeName, this.state.elements]);

        return (
         
            <ReactFlowProvider>
               <Navigation publishClick={this.onSaveAndPublishClick.bind(this)} configUpdate={this.configUpdate.bind(this)}/>
               <Propwrap element={this.state.element} updateNodeCb={this.updateEdgeText.bind(this)} />
              <div className="sectionLeft dndflow reactflow-wrapper nested" ref={this.state.reactFlowWrapper}>
               <ReactFlow 
                elements={this.state.elements}
                onConnect={this.onConnect.bind(this)}
                onElementsRemove={this.onElementsRemove.bind(this)}
                onLoad={this.onLoad.bind(this)}
                onDrop={this.onDrop.bind(this)}
                onDragOver={this.onDragOver.bind(this)}
                deleteKeyCode={46}
                snapToGrid={true}
                snapGrid={[30, 30]}
                onElementClick={this.onElementClick.bind(this)}
                defaultZoom={1.5}
                onNodeDragStop={this.onNodeDragStop.bind(this)}
                nodeTypes={nodeTypes}
              >
                  <MiniMap
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.type === 'input') return '#0041d0';
                if (n.type === 'output') return '#ff0072';
                if (n.type === 'default') return '#1a192b';
                if (n.type === 'selectorInput') return '#0041d0';
                if (n.type === 'selectorStop') return '#ff0072';
                if (n.type === 'selectorNodeStart') return '#1a192b';

                return '#eee';
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;

                return '#fff';
              }}
              nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#aaa" gap={16} />

          </ReactFlow>
               </div>
            </ReactFlowProvider>

        );
    }
  }
  export default ContentDiv