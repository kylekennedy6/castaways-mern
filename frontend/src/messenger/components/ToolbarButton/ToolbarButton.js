import React from 'react';
import { Link } from 'react-router-dom';
import './ToolbarButton.css';

const ToolbarButton = props => {
  const { icon } = props;
  let element = <i className={`toolbar-button ${icon}`} />;
  return props.to ? <Link to={props.to}>{element}</Link> : element;
};

export default ToolbarButton;
