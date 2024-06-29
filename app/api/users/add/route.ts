import { NextRequest , NextResponse } from "next/server";


export async function POST(req : NextRequest , res : NextResponse) {
  // get the data from body 
    const data = req.body;
    console.log(data);

    // return the response
    return NextResponse.json({ message: "success" });
}