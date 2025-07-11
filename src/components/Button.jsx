import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  onClick, // accept external onClick
}) => {
  // Create safe class names
  const sizeClass = size ? `text-${size}` : '';
  const widthClass = width ? `w-${width}` : '';
  const hoverClass = bgHoverColor ? `hover:bg-${bgHoverColor}` : '';

  return (
    <button
      type="button"
      onClick={onClick} // use the passed-in handler, don't override it
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`${sizeClass} p-3 ${widthClass} hover:drop-shadow-xl ${hoverClass}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;