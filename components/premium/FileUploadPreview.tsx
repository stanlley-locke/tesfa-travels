'use client';

import { Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface FileUploadPreviewProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFormats?: string[];
}

export function FileUploadPreview({
  onFilesChange,
  maxFiles = 4,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedFormats = ['image/jpeg', 'image/png', 'application/pdf'],
}: FileUploadPreviewProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxSize) {
          console.warn(`File ${file.name} is too large`);
          return false;
        }
        if (!acceptedFormats.includes(file.type)) {
          console.warn(`File ${file.name} format not accepted`);
          return false;
        }
        return true;
      });

      if (files.length + validFiles.length <= maxFiles) {
        const newFiles = [...files, ...validFiles];
        setFiles(newFiles);
        onFilesChange(newFiles);
      }
    },
    [files, maxFiles, maxSize, acceptedFormats, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-accent bg-accent/10 scale-105'
            : 'border-slate-300 dark:border-slate-600 hover:border-accent'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-accent mb-2" />
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {isDragActive ? 'Drop your files here' : 'Drag and drop documents here'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          or click to select files (max {maxFiles} files, {(maxSize / 1024 / 1024).toFixed(0)}MB each)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Uploaded Files ({files.length}/{maxFiles})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="relative h-32 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-2xl">📄</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate px-1">
                        {file.name.substring(0, 10)}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
