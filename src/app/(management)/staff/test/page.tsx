"use client"
import ImageUpload from "@/components/custom-file-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen flex-col space-y-4">
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow" variant="outline">
              File upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-center">
                Upload your files
              </DialogTitle>
              <DialogDescription className="text-center">
                The only file upload you will ever need
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <ImageUpload />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
