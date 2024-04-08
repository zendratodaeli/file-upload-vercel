"use server"

import { put } from "@vercel/blob";
import { env } from "process";
import prisma from "../db";

export async function uploadFile(formData: FormData) {
  const BLOB_API = "vercel_blob_rw_JBAzJmB6INhdFXOV_bwQDaOryLLHGGN5RluqJWPLdXaoiXc"
  const file = formData.get('file');

  if (!file || typeof file === 'string' || !('name' in file && 'type' in file && 'size' in file)) {
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

    const { url } = await put(`uploads/${file.name}`, file, { access: 'public', token: BLOB_API });

    const fileUpload = await prisma.uploadedFileData.create({
      data: {
        filename: file.name,
        filepath: `uploads/${file.name}`,
       }
    });

    


    return { message: "File uploaded successfully", url, status: 200 };
  } catch (error) {
    console.error("Server error during file upload", error);
    return { error: "Server error during file upload", status: 500 };
  }
}
