
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Upload, File, X, Check } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploaderProps {
  onUpload?: (file: File) => void;
  allowedFileTypes?: string[];
  maxSizeMB?: number;
}

const DocumentUploader = ({
  onUpload,
  allowedFileTypes = [".doc", ".docx", ".pdf", ".xls", ".xlsx"],
  maxSizeMB = 10,
}: DocumentUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    // Check file size
    if (file.size > maxSizeBytes) {
      toast.error(`File size exceeds the ${maxSizeMB}MB limit`);
      return false;
    }
    
    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error(`File type not supported. Please upload: ${allowedFileTypes.join(", ")}`);
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileValidationAndUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileValidationAndUpload(file);
    }
  };

  const handleFileValidationAndUpload = (file: File) => {
    if (validateFile(file)) {
      setUploadedFiles([...uploadedFiles, file]);
      if (onUpload) {
        onUpload(file);
      }
      toast.success(`File "${file.name}" added successfully`);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const uploadFiles = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast.success(`${uploadedFiles.length} ${uploadedFiles.length === 1 ? 'file' : 'files'} uploaded successfully`);
      // In real application, you would send files to your API here
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>
          Upload document templates for your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-md p-6 transition-colors duration-200 ease-in-out relative ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Upload size={32} className="text-muted-foreground" />
            <div className="flex flex-col space-y-1">
              <h3 className="text-lg font-semibold">Drag & drop your files here</h3>
              <p className="text-sm text-muted-foreground">
                or click to browse your computer
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: {allowedFileTypes.join(", ")} (Max size: {maxSizeMB}MB)
            </p>
          </div>
          
          <Input
            id="file-upload"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept={allowedFileTypes.join(",")}
          />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <Label>Selected Files</Label>
            <div className="mt-2 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={uploadFiles} 
          disabled={uploadedFiles.length === 0 || uploading}
          className="ml-auto"
        >
          {uploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Upload Files
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentUploader;
