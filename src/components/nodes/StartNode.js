import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import {DisplayNodeHeader, DisplayNodeBody} from './NodeDisplay';


const StartNode = ({ data }) => {
  return (
    <>
        <div className="blockelem noselect block botInput">
            <DisplayNodeHeader data={data} displayColor={'blockyBlue'}></DisplayNodeHeader>
            <DisplayNodeBody data={data}></DisplayNodeBody>
            <Handle type="source" position="bottom" style={{ borderRadius: 0,background:'green' }} />
        </div>
    </>
  );
};

export default memo(StartNode);