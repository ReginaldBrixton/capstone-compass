import React, { useRef } from "react"

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="file-upload">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      <button onClick={() => fileInputRef.current.click()}>📎</button>
    </div>
  )
}

export default FileUpload

