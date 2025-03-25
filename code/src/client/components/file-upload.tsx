import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";
interface FileUploadProps {
  onUploadSuccess: (fileUrl: string) => void;
  onError: (error: string) => void;
}

export default function FileUpload({
  onUploadSuccess,
  onError,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".eml")) {
      onError("Please select a valid .eml file");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) {
      onError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("emailFile", file); // Match backend field name

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      // Send file to Express API
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload file");
      }

      setUploadProgress(100);

      const data = await response.json();
      setUploadSuccess(true);
      toast.success("File uploaded successfully");

      onUploadSuccess(data.fileUrl);
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-accent/50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-muted-foreground">EML files only</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".eml"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || isUploading || uploadSuccess}
          className="min-w-24"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {file && (
        <div className="text-sm">
          Selected file: <span className="font-medium">{file.name}</span>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">
            {uploadProgress}%
          </p>
        </div>
      )}

      {uploadSuccess && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500">
          <CheckCircle className="h-4 w-4" />
          <span>File uploaded successfully!</span>
        </div>
      )}
    </div>
  );
}
