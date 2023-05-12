import axios from "axios";
import { useCallback, useState } from "react";
import Dropzone, { DropzoneState } from "react-dropzone";

const Uploader = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post<{ filename: string }>("http://localhost:8000/upload", formData)
      .then((res) => setUploadedFile(res.data.filename))
      .catch((err) => console.error(err));
  }, []);

  const renderDropzoneContent = (props: DropzoneState) => {
    const { getRootProps, getInputProps } = props;
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
        <input type="file" onChange={(e) => onDrop(e.target.files!)} />
        {uploadedFile && (
          <img
            src={`http://localhost:8000/upload/images/${uploadedFile}`}
            alt="Uploaded file"
          />
        )}
      </div>
    );
  };

  return <Dropzone onDrop={onDrop}>{renderDropzoneContent}</Dropzone>;
};

export default Uploader;
