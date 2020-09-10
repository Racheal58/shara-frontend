import React from 'react';

import './index.scss';

const Button = props => {
  const { className, type = 'button', onClick, value, children } = props;
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {value ? value : children}
    </button>
  );
};

export default Button;
