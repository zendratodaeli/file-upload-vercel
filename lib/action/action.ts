"use server";

import { NextResponse } from "next/server";

export async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File;
    console.log(file);

    const allowedMimeTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv"
      ];

      if (!file || typeof file === 'string' || !file.name || !allowedMimeTypes.includes(file.type)) {
        return new NextResponse(JSON.stringify({error: "Unsupported file type"}), {
          status: 400,
          headers: {"Content-Type": "application/json"}
        });
      }

    return {
        status: 200,
        message: 'File uploaded'
    }
}
