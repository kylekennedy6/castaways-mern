import React from 'react';

import './Island.css';

const Island = props => {
  return (
    <div className={`island ${props.className}`} style={props.style}>
      <img
        src="https://png.pngtree.com/thumb_back/fw800/back_our/20190623/ourmid/pngtree-summer-island-cartoon-banner-image_244698.jpg"
        alt="Island.jpg"
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Island;
