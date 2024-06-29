
// app/api/files/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import File from '@/app/models/fileSchema';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all files from the database
    const files = await File.find({}).lean();

    // Return the files as JSON
    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ error: "An error occurred while fetching files" }, { status: 500 });
  }
}