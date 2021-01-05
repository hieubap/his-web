import React from 'react';
import list from 'cores';

export const renderContent = (type) => (props, children = null) => {
  const obj = list[type];
  if (obj) {
    return React.createElement(obj.component, props, children);
  }
  
  return null;
};
