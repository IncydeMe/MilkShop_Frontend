"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileUploader } from "@/components/file-upload/file-uploader"

export function DialogUploaderDemo() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Tải ảnh {files.length > 0 && `(${files.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Tải hình ảnh</DialogTitle>
          <DialogDescription>
            Kéo thả hình ảnh vào hoặc ấn vào đây để tải lên.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          maxFiles={8}
          maxSize={8 * 1024 * 1024}
          onValueChange={setFiles}
        />
      </DialogContent>
    </Dialog>
  )
}