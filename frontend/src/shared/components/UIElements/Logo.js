import React from 'react';

import logo from '../../static/logo.png';
import './Logo.css';

const Logo = props => {
  return (
    <div className={`logo ${props.className}`} style={props.style}>
      <img
        src={logo}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Logo;
