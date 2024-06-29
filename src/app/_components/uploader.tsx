"use client"

import * as React from "react"

import { useUploadFile } from "@/hooks/use-upload-file"
import { FileUploader } from "@/components/file-upload/file-uploader"

import { UploadedFilesCard } from "./upload-files-card"

export function BasicUploaderDemo() {
  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )

  React.useEffect(() => {
    if(uploadedFiles.length > 0) {
      console.log(uploadedFiles[0].url)
      // Temporal variable to store the URL of the uploaded file
      const url = uploadedFiles[0].url
      sessionStorage.setItem('uploadedFileURL', url)
    }
  }, [uploadedFiles])

  return (
    <div className="space-y-6">
      <FileUploader
        maxFiles={1}
        maxSize={4 * 1024 * 1024}
        progresses={progresses}
        onUpload={uploadFiles}
        disabled={isUploading}
      />
      <UploadedFilesCard uploadedFiles={uploadedFiles} />
    </div>
  )
}