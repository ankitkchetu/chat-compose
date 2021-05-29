
import TextNode from '../nodes/TextNode';
import MediaNode from '../nodes/MediaNode';
import SuggestionChipsNode from '../nodes/SuggestionChipsNode';
import CarouselChipsNode from '../nodes/CarouselChipsNode';
import Userinput from '../nodes/Userinput';
import StartNode from '../nodes/StartNode';
import ToAgentNode from '../nodes/ToAgentNode';
import ApiCallingNode from '../nodes/ApiCallingNode';
import ScriptNode from '../nodes/ScriptNode';
import StopNode from '../nodes/StopNode';

export const NodeTypes = {
   selectorText:TextNode,
   selectorMedia:MediaNode,
   selectorSuggestionChips:SuggestionChipsNode,
   selectorCarouselChips:CarouselChipsNode,
   selectorUserInput: Userinput,
   selectorNodeStart: StartNode,
   selectorToAgent:ToAgentNode,
   selectorApiCalling:ApiCallingNode,
   selectorScriptNode:ScriptNode,
   selectorStop: StopNode,
 }
export const leftPalateConstants = {
    "send":{
       "title":"Bot Send",
       "elements":[
          {
             "label":"Text",
             "description": "Send user a text message",
             "nextNodeHints": "Next should be User Input",
             "type":"selectorText",
             "image":"eye.svg",
             "subtype":"text",
             "class":"blockyBlue"
          },
          {
             "label":"Multimedia",
             "description": "Send user a multimedia link",
             "nextNodeHints": "Next should be User Input",
             "type":"selectorMedia",
             "image":"database.svg",
             "subtype":"multimedia",
             "class":"blockyBlue"
          },
          {
             "label":"Suggestion Cips",
             "description": "Send users mulltiple suggestions",
             "nextNodeHints": "Next should be User Input",
             "type":"selectorSuggestionChips",
             "subtype":"suggestionchip",
             "image":"time.svg",
             "class":"blockyBlue"
          },
          {
             "label":"Carousel Cips",
             "description": "Send user multiple card options",
             "nextNodeHints": "Next should be User Input",
             "type":"selectorCarouselChips",
             "subtype":"carousel",
             "image":"error.svg",
             "class":"blockyBlue"
          }
       ]
    },
    "receive":{
       "title":"Bot Recevies",
       "elements":[
          {
             "label":"User Input",
             "description": "Output edges from this nodes are intents",
             "nextNodeHints": "Next should be either Bot Send or Actions nodes",
             "type":"selectorUserInput",
             "image":"eye.svg",
             "subtype":"userinput",
             "class":"blockyGreen"
          }
       ]
    },
    "action":{
       "title":"Bot Actions",
       "elements":[
          {
             "label":"Start",
             "description": "Initialize a conversation",
             "nextNodeHints": "Next node should be either Bot Send or Actions nodes",
             "type":"selectorNodeStart",
             "image":"eye.svg",
             "subtype":"start",
             "class":"blockyGrey"
          },
          {
             "label":"To Agent",
             "subtype":"toagent",
             "description": "Transfer current conversation to agent",
             "nextNodeHints": "Next node could be anything",
             "type":"selectorToAgent",
             "image":"action.svg",
             "class":"blockyGrey"
          },
          {
             "label":"Api Calling",
             "subtype":"apicalling",
             "description": "GET and POST method allowed. Request and response are json",
             "nextNodeHints": "Next node could be anything",
             "type":"selectorApiCalling",
             "image":"action.svg",
             "class":"blockyGrey"
          },
          {
             "label":"Script Node",
             "subtype":"scriptnode",
             "description": "Process input data and set result to output variables",
             "nextNodeHints": "Next node could be anything",
             "type":"selectorScriptNode",
             "image":"action.svg",
             "class":"blockyGrey"
          },
          {
             "label":"Close",
             "subtype":"closenode",
             "description": "Close conversation session",
             "nextNodeHints": "This is a final node of the flow",
             "type":"selectorStop",
             "image":"terminate.svg",
             "class":"blockyRed"
          }
       ]
    }
 };


 export const initialCanvasValue = [{"id":"dndnode_0","type":"selectorNodeStart","position":{"x":-30,"y":-360},"label":"Start","data":{"label":"Start","description":"Next node should be either Bot Send or Actions nodes","subtype":"start","type":"node","image":"eye.svg","class":"blockyGrey","var_name":"start"}},{"id":"dndnode_1","type":"selectorUserInput","position":{"x":-180,"y":-180},"label":"User Input","data":{"label":"User Input","description":"Next should be either Bot Send or Actions nodes","subtype":"userinput","type":"node","image":"eye.svg","class":"blockyGreen"}},{"id":"dndnode_2","type":"selectorText","position":{"x":-180,"y":60},"label":"Text","data":{"label":"Text","description":"Next should be User Input","subtype":"text","type":"node","image":"eye.svg","class":"blockyBlue"}},{"source":"dndnode_1","sourceHandle":"b","target":"dndnode_2","targetHandle":"a","animated":false,"label":"Intent Name edge_1","data":{"label":"Intent Name edge_1","type":"edge","subtype":"intent","examples":[{"description":"","example":"ankiy"},{"example":"asbamsnads"},{"example":"sdsfdsf"}]},"id":"intent_edge_1","arrowHeadType":"arrowclosed","type":"smoothstep","style":{"stroke":"blue"}}]

