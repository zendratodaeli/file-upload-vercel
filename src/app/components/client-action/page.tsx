"use client"

import { useState } from "react";
import { uploadFile } from "../../../../lib/action/action";

const UploadReportForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmitUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append("file", file as Blob);
    

    try {
      const response = await uploadFile(formData);
      if (response.status == 200) {
        console.log("Upload successful");
      } else {
        console.error("Upload failed", response); 
      }
      
    } catch (error) {
      console.error("Error uploading file:", error);
      alert('An error occurred while uploading the report.');
    }
  };

  const styles = {
    form: "bg-grey-100 p-4 rounded-lg",
    input: "border p-2 mb-4 w-full border-gray-300 rounded"
  }

  return (
    <div className="container-fluid relative px-3">
      <div className="layout-specing">
        <form onSubmit={handleSubmitUploadReport} className={styles.form}>
          <input 
            type="file" 
            name="newfile" 
            className={styles.input} 
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv" 
            onChange={e => setFile(e.target.files?.item(0) || null)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UploadReportForm;
