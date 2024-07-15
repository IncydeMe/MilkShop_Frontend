"use client"

import * as React from "react"

import { useUploadFile } from "@/hooks/use-upload-file"
import { FileUploader } from "@/components/file-upload/file-uploader"

import { UploadedFilesCard } from "./upload-files-card"

import { ProductImages } from "@/types/product"

export function BasicUploaderDemo() {
  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )

  React.useEffect(() => {
    if(uploadedFiles.length > 0) {
      const productImages = uploadedFiles.map((file: any) => {
        return {
          imageId: file.id,
          url: file.url,
          productId: 1,
          isThumbnail: false
        }
      }) as ProductImages[]


      sessionStorage.setItem('productImages', JSON.stringify(productImages))
    }
  }, [uploadedFiles])

  return (
    <div className="space-y-6">
      <FileUploader
        maxFiles={4}
        maxSize={4 * 1024 * 1024}
        progresses={progresses}
        onUpload={uploadFiles}
        disabled={isUploading}
      />
      <UploadedFilesCard uploadedFiles={uploadedFiles} />
    </div>
  )
}