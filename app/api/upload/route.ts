// pages/api/upload.ts
import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import File from '@/app/models/fileSchema';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const examinerAccess = formData.get('examinerAccess') === 'true';
    const invigilatorAccess = formData.get('invigilatorAccess') === 'true';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files found" }, { status: 400 });
    }

    const storage = new Storage({ keyFilename: "key.json" });
    const bucket = storage.bucket("cypher-sheets-bucket");

    const uploadedFiles = [];

    for (let file of files) {
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);

      // Generate a unique filename
      const uniqueFilename = `${Date.now()}-${file.name}`;
      const blob = bucket.file(uniqueFilename);

      // Upload the file
      await blob.save(fileBuffer, {
        contentType: file.type,
        public: true, // Make the file publicly accessible
      });

      // Get the file metadata
      const [metadata] = await blob.getMetadata();

      // Generate a signed URL that expires in 1 hour (3600 seconds)
      const [signedUrl] = await blob.getSignedUrl({
        action: 'read',
        expires: Date.now() + 3600 * 10000,
      });

      const newFile = new File({
        filename: file.name,
        fileID: metadata.id,
        fileAccessURL: signedUrl,
        uploadedBy: {
          email: email,
          role: role
        },
        canBeAccessedBy: {
          Examiner: examinerAccess,
          Invigilator: invigilatorAccess
        }
      });

      await newFile.save();
      uploadedFiles.push(newFile);
    }

    return NextResponse.json({ message: "Files uploaded successfully", files: uploadedFiles }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred while uploading files" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};