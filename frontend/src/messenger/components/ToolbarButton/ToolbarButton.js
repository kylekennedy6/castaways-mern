import React from 'react';
import './ToolbarButton.css';

const ToolbarButton = props => {
  const { icon } = props;
  return <i className={`toolbar-button ${icon}`} onClick={props.onClick} />
};

export default ToolbarButton;
