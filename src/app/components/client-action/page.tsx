"use client";

import { uploadFile } from "@/lib/action/action";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadReportForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [inProgress, setInProgress] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    // Assuming you want to use only the first file
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmitUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setInProgress(true);

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData);
      if (response && response.status == 200) {
        console.log("Upload successful");
      } else {
        console.error("Upload failed", response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert('An error occurred while uploading the report.');
    }

    setInProgress(false);
  };

  return (
    <div className="container-fluid relative px-3">
      <div className="layout-spacing">
        <form onSubmit={handleSubmitUploadReport} className="bg-grey-100 p-4 rounded-lg">
          <div {...getRootProps()} className="border p-2 mb-4 w-full border-gray-300 rounded flex justify-center items-center cursor-pointer">
            <input {...getInputProps()} accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv" />
            {isDragActive ? (
              <p>Upload</p>
            ) : (
              <p>Drag & drop a file here, or click to select a file</p>
            )}
          </div>

          {file && (
            <div className="file-preview p-2 mb-4 flex justify-center">
              <p>Selected File:</p>
              <p>{file.name} ({Math.round(file.size / 1024)} KB)</p>
            </div>
          )}

          <button type="submit" className="mt-4 bg-green-500 text-black border border-green-700 hover:bg-green-600 hover:text-white w-full flex justify-center items-center">
            <span className="ml-2">{inProgress ? "Submitting..." : "Submit"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadReportForm;
