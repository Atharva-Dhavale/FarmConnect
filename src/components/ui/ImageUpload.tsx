"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
}

export default function ImageUpload({
  onUpload,
  maxFiles = 1,
  maxSize = 5, // 5MB default
  accept = 'image/*',
}: ImageUploadProps) {
  const [files, setFiles] = useState<{ preview: string; uploading: boolean }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Check if we've exceeded the max number of files
      if (files.length + acceptedFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files`);
        return;
      }

      // Add previews for all accepted files
      const newFiles = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        uploading: true,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      setIsUploading(true);

      try {
        const uploadPromises = acceptedFiles.map(async (file, index) => {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          return data.secure_url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        // Update file states to show they're done uploading
        setFiles((prev) =>
          prev.map((file, i) => {
            if (i >= prev.length - acceptedFiles.length) {
              return { ...file, uploading: false };
            }
            return file;
          })
        );

        onUpload(uploadedUrls);
        toast.success('Images uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload images');
        
        // Remove the files that failed to upload
        setFiles((prev) => prev.slice(0, prev.length - acceptedFiles.length));
      } finally {
        setIsUploading(false);
      }
    },
    [files.length, maxFiles, onUpload]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      
      // Clean up the object URL to avoid memory leaks
      URL.revokeObjectURL(newFiles[index].preview);
      
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-md text-center cursor-pointer transition ${
          isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-gray-500">
          <Upload className="w-10 h-10 mb-2" />
          <p className="text-base font-medium">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select'}
          </p>
          <p className="text-sm mt-1">
            Supports: {accept || 'All file types'} (Max: {maxSize}MB)
          </p>
          {maxFiles > 1 && (
            <p className="text-sm mt-1">You can upload up to {maxFiles} files</p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative rounded-md overflow-hidden group">
              <img
                src={file.preview}
                alt={`Preview ${index}`}
                className="h-32 w-full object-cover"
              />
              {file.uploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 