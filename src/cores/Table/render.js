import React from 'react';
import components from 'cores';

const boxRender = (com) => (props) => {
  if (components[com]) {
    return React.createElement(components[com]['component'], props);
  }
};

export default boxRender;