import Image from "next/image"
import type { UploadedFile } from "@/types/uploadthing"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/file-upload/empty-card"

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[]
}

export const UploadedFilesCard:React.FC<UploadedFilesCardProps> = ({ 
  uploadedFiles,
}: UploadedFilesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tệp đã tải lên</CardTitle>
        <CardDescription>Xem các tệp đã tải lên tại đây</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => (
                <div key={file.key} className="relative aspect-video w-64">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="eager"
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="Chưa tải lên tệp nào"
            description="Tệp tải lên sẽ xuất hiện ở đây"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  )
}