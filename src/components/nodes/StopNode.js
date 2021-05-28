import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import {DisplayNodeHeader, DisplayNodeBody} from './NodeDisplay';

const StopNode = ({ data }) => {
  return (
    <>
        <div className="blockelem noselect block botInput">
            <Handle type="target" position="top" style={{ borderRadius: 0,background:'red' }} />
            <DisplayNodeHeader data={data} displayColor={'blockyRed'}></DisplayNodeHeader>
            <DisplayNodeBody data={data}></DisplayNodeBody>
        </div>
    </>
  );
};

export default memo(StopNode);