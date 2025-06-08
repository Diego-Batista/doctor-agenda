import axios from "axios";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "Arquivo não encontrado" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;

  const uploadForm = new FormData();
  uploadForm.append("file", buffer, {
    filename: file.name,
    contentType: file.type,
  });
  uploadForm.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      uploadForm,
      {
        headers: uploadForm.getHeaders(),
      },
    );
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error?.message || "Erro no upload" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Erro desconhecido no upload" },
      { status: 500 },
    );
  }
}
