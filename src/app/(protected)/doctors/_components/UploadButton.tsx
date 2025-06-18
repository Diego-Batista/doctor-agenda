import { useState } from "react";
import { toast } from "sonner";

interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  accept?: string;
}

export function UploadButton({
  onUploadComplete,
  label = "Enviar Imagem",
  accept = "image/*",
}: UploadButtonProps) {
  const [loading, setLoading] = useState(false);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro no upload");
      }
      onUploadComplete(data.secure_url);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido no upload.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <label
      htmlFor="file-upload"
      className={`text-primary bg-primary-foreground inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
      aria-disabled={loading}
    >
      {loading ? "Carregando..." : label}
      <input
        id="file-upload"
        type="file"
        accept={accept}
        className="hidden"
        onChange={onFileChange}
        disabled={loading}
      />
    </label>
  );
}
