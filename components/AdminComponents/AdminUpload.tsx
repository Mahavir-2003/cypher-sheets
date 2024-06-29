"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

const AdminUpload = () => {
  const [filesToBeUploaded, setFilesToBeUploaded] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [examinerAccess, setExaminerAccess] = useState(false);
  const [invigilatorAccess, setInvigilatorAccess] = useState(false);

  const uploadFiles = async () => {
    if (filesToBeUploaded.length === 0) {
      setUploadStatus("No files selected");
      return;
    }

    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      filesToBeUploaded.forEach((file) => {
        formData.append('files', file);
      });

      // Add user info and access permissions
      formData.append('email', 'user@example.com'); // Replace with actual user email
      formData.append('role', 'Admin'); // Replace with actual user role
      formData.append('examinerAccess', examinerAccess.toString());
      formData.append('invigilatorAccess', invigilatorAccess.toString());

      const res = await axios.post("/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res.data);
      setUploadStatus("Files uploaded successfully");
    } catch (e) {
      console.error(e);
      setUploadStatus("Error uploading files");
    }
  };

  const openUploadBox = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.docx";
    input.multiple = true;
    input.click();

    input.onchange = (e) => {
      if (e.target) {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          const fileArray = Array.from(files);
          setFilesToBeUploaded(fileArray);
        }
      }
    };
  };

  return (
    <>
      <div
        onClick={openUploadBox}
        className="w-full h-[40%] flex-col flex relative justify-center items-center rounded-md border-border border-[1px] hover:cursor-pointer"
      >
        <div className="h-[15%] w-[15%] relative">
          <Image
            className="stroke-white"
            src="/upload.svg"
            alt="Upload"
            fill={true}
          />
        </div>
        <div className="text-[#666] text-sm">Click to upload files</div>
      </div>
      
      {filesToBeUploaded.length > 0 && (
        <div className="mt-4">
          <h3>Selected Files:</h3>
          <ul>
            {filesToBeUploaded.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <div className="mt-2">
            <label>
              <input 
                type="checkbox" 
                checked={examinerAccess} 
                onChange={(e) => setExaminerAccess(e.target.checked)} 
              /> Examiner Access
            </label>
          </div>
          <div>
            <label>
              <input 
                type="checkbox" 
                checked={invigilatorAccess} 
                onChange={(e) => setInvigilatorAccess(e.target.checked)} 
              /> Invigilator Access
            </label>
          </div>
          <Button onClick={uploadFiles} className="mt-2">Upload Files</Button>
        </div>
      )}

      {uploadStatus && <p className="mt-2">{uploadStatus}</p>}
    </>
  );
};

export default AdminUpload;