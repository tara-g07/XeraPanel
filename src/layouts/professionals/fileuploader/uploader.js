import React, { useState } from "react";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./fileUploader.css";
import { fetchApi } from "api";

const FileUploader = ({ onChange }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [files, setFiles] = useState([]);
  const url = "api/user/home/uploader";

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...files];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      // Add the new file to the list with its preview URL
      updatedFiles.push({
        file,
        preview: URL.createObjectURL(file),
      });

      // API call to upload the file
      await fetchApi(url, { file }, "post-imgUpload").then((res) => console.log(res));
    }

    setFiles(updatedFiles);

    if (onChange) {
      onChange(updatedFiles);
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    if (onChange) {
      onChange(updatedFiles);
    }
  };

  return (
    <form className="file-upload-form ">
      <div>
        <label htmlFor="file" className="file-upload-label">
          <div className="file-upload-design ">
            <svg viewBox="0 0 640 512" height="1em">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <p>Drag and drop </p>
            <p>Or</p>
            <span className="browse-button"> Choose file...</span>
          </div>
          <input
            id="file"
            type="file"
            accept="image/*,video/*"
            multiple 
            onChange={(e) => handleFileChange(e)}
          />
        </label>

        <div className="file-preview-container">
          {files.map((file, index) => (
            <div key={index} className="relative file-preview-item">
              {file.file.type.startsWith("image/") ? (
                <img src={file.preview} alt={`Preview ${index + 1}`} className="preview-image" />
              ) : (
                <video src={file.preview} controls className="preview-video" />
              )}
              <button className="delete-button" onClick={() => handleDeleteFile(index)}>
                <IoIosCloseCircleOutline className=" text-red-400 font-extrabold text-4xl absolute left-4 top-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default FileUploader;
