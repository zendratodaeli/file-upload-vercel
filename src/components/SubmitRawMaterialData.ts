// submitRawMaterialData.ts
"use server";

import prisma from "@/lib/db";
import { RawMaterialValidator } from "./ValidatorsRawMaterialData";


export default async function SubmitRawMaterialData(formData: any) {
  const result = RawMaterialValidator.safeParse(formData);

  if (!result.success) {
    console.error("Validation failed", result.error);
    throw new Error("Validation failed");
  }

  try {
    const newEntry = await prisma.rawMaterialSustainabilityData.create({
      data: result.data,
    });
    return newEntry;
  } catch (e) {
    console.error("Database submission error", e);
    throw new Error("Database submission error");
  }
}
