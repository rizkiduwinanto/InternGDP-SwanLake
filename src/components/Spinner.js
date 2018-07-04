import React from 'react';
import ReactLoading from 'react-loading';

const defaultType = 'bubbles';
const defaultColor = 'rgb(63, 81, 181)';
const defaultHeight = 150;
const defaultWidth = 150;

export default ({
  type=defaultType,
  color=defaultColor,
  height=defaultHeight,
  width=defaultWidth}) => {
  
  return (
    <ReactLoading className="mx-auto" type={type} color={color} height={height} width={width} />
  );
}