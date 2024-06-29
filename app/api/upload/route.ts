import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // the body will contain the list of multiple files
  try {
    const data = req.body as unknown as { files: any[] }; // Cast data to the appropriate type
    console.log(data);

    // get all the files
    const files = data.files;

    if (!files) {
      return NextResponse.json({ error: "No files found" }, { status: 400 });
    }

    console.log(files);

    let fileIds = [];

    // connect to the cloud storage
    const storage = new Storage({ keyFilename: "key.json" });
    const bucket = storage.bucket("cypher-sheets-bucket");

    // loop through the files
    for (let file of files) {
      // upload files to the cloud
      const res = await bucket.upload(file);
      console.log(res);
      console.log("File uploaded successfully")
      // fileIds.push(res[0].metadata.id)
    }
  } catch (e) {
    console.log(e);
  }
}
