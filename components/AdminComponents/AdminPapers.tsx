"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FileInformation = {
  filename: string;
  fileID: string;
  fileAccessURL: string;
  uploadedBy: {
    email: string;
    role: string;
  };
  canBeAccessedBy: {
    Examiner: boolean;
    Admin: boolean;
    Invigilator: boolean;
  };
};

const AdminPapers = () => {
  const [files, setFiles] = useState<FileInformation[]>([]);

  async function fetchFiles() {
    try {
      const response = await fetch("/api/admin/get");
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      console.log(data.files);
      setFiles(data.files);
      // Process the files data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of All Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >filename</TableHead>
            <TableHead>email</TableHead>
            <TableHead>role</TableHead>
            <TableHead className="text-right">Accessed By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.fileID}>
              <TableCell>{file.filename}</TableCell>
              <TableCell>{file.uploadedBy.email}</TableCell>
              <TableCell>{file.uploadedBy.role}</TableCell>
              <TableCell className="text-right">
                {Object.entries(file.canBeAccessedBy)
                  .filter(([, value]) => value)
                  .map(([key]) => key)
                  .join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPapers;
