import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import {DisplayNodeHeader, DisplayNodeBody} from './NodeDisplay';


const SuggestionChipsNode = ({ data }) => {
  let errorClass='';
  if((data.subtype==='multimedia'&&(data.mediaUrl!==""))||(data.subtype==='suggestionchip'&&(!data.rowChip||data.rowChip.length<0||(data.rowChip[0].text===''||data.rowChip[0].description==='')))){
    errorClass='red';
  }
  return (
    <>
        <div className={`blockelem noselect block botInput ${errorClass}`}>
            <Handle type="target" id="a" position="top" style={{ borderRadius: 0 }} />
            <DisplayNodeHeader data={data} displayColor={'blockyBlue'}></DisplayNodeHeader>
            <DisplayNodeBody data={data}></DisplayNodeBody>
            <Handle type="source" id="b" position="bottom" style={{ borderRadius: 0 }} />
            <Handle type="target" id="c" position="right" style={{ top: '50%', borderRadius: 0 }} />
            <Handle type="target" id="d" position="left" style={{ top: '50%', borderRadius: 0 }} />
        </div>
    </>
  );
};

export default memo(SuggestionChipsNode);