// "use server";

// import { NextResponse } from "next/server";

// export async function uploadFile(formData: FormData) {
//     const file = formData.get('file') as File;
//     console.log(file);

//     const allowedMimeTypes = [
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/pdf",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "text/csv"
//       ];

//       if (!file || typeof file === 'string' || !file.name || !allowedMimeTypes.includes(file.type)) {
//         return new NextResponse(JSON.stringify({error: "Unsupported file type"}), {
//           status: 400,
//           headers: {"Content-Type": "application/json"}
//         });
//       }

//     return {
//         status: 200,
//         message: 'File uploaded'
//     }
// }

"use server";

import { NextResponse } from "next/server";

export async function uploadFile(formData: FormData) {
  const BLOB_API = process.env.BLOB_READ_WRITE_TOKEN;
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return { error: "Invalid file", status: 400 };
  }

  const allowedMimeTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv"
  ];

  if (!allowedMimeTypes.includes(file.type)) {
    return { error: "Unsupported file type", status: 400 };
  }

  try {
    // Dummy URL - replace with your actual Blob Storage URL
    const blobStorageUrl = `https://your-blob-storage-url/`;

    const response = await fetch(blobStorageUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${BLOB_API}`,
        "Content-Type": file.type
      },
      body: file.stream() // Send the file stream directly
    });

    if (response.ok) {
      return { message: "File uploaded successfully", status: 200 };
    } else {
      return { error: "Failed to store file in Blob Storage", status: response.status };
    }
  } catch (error) {
    return { error: "Server error during file upload", status: 500 };
  }
}
