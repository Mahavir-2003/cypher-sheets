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
import { Button } from "../ui/button";

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
      const response = await fetch("/api/users/get");
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

  const openLink = (e: any) => {
    window.open(e.target.accessKey, "_blank");
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of All Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>filename</TableHead>
            <TableHead>email</TableHead>
            <TableHead>role</TableHead>
            <TableHead className="text-right">Accessed By</TableHead>
            <TableHead className="text-right">View</TableHead>
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
                <TableCell className="text-right">
                  <Button onClick={openLink} accessKey={file.fileAccessURL}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPapers;
