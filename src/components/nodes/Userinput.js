import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import {DisplayNodeHeader, DisplayNodeBody} from './NodeDisplay';


const Userinput = ({ data }) => {
  return (
    <>
        <div className="blockelem noselect block botInput">
          <Handle type="target" id="a" position="top" style={{ borderRadius: 0 ,left:'99%'}} />
            <DisplayNodeHeader data={data} displayColor={'blockyBlue'}></DisplayNodeHeader>
            <DisplayNodeBody data={data}></DisplayNodeBody>
            <Handle type="source" id="b" position="bottom" style={{ borderRadius: 0,left:'0%' }} />
            <Handle type="target" id="c" position="right" style={{ top: '99%', borderRadius: 0 }} />
            <Handle type="target" id="d" position="left" style={{ top: '0%', borderRadius: 0 }} />
        </div>
    </>
  );
};

export default memo(Userinput);