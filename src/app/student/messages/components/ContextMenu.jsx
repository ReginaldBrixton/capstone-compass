import React from 'react';
const ContextMenu = ({ x, y, onClose, options }) => {
  return (
    <div
      className="context-menu"
      style={{
        top: y,
        left: x,
      }}
      data-oid="hg7ygzo"
    >
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => {
            option.action();
            onClose();
          }}
          data-oid="lkht62."
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
export default ContextMenu;
