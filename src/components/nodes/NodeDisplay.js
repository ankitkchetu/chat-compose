import React from 'react';

export const DisplayNodeHeader = (props) => {

    return (
            <div className={props.data.class || props.displayColor ? props.displayColor: ''}>
                <div className="blockyleft">
                {props.data.var_name?null:<img src={`/assets/errorred.svg`}  alt={props.data.image} title="Name is required"/>}
                 <img src={`/assets/${props.data.image.split('.').join('blue.')}`} alt={props.data.image}/>
                  <p className="blockyname">{props.data.label}{props.data.var_name&&' ('+props.data.var_name+')'}</p>
                </div>
            </div>

    );

};

export const DisplayNodeBody = (props) => {

    return (
        <>
            <div className="blockydiv"></div>
            <div className="blockyinfo">{props.data.description}</div>
        </>
    );
};


