import React, { useRef } from 'react';
const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };
  return (
    <div className="file-upload" data-oid="cichi.6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{
          display: 'none',
        }}
        data-oid="zwr:cia"
      />
      <button onClick={() => fileInputRef.current.click()} data-oid=":00hmf1">
        📎
      </button>
    </div>
  );
};
export default FileUpload;
