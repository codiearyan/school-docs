"use client"
import { X, FileIcon, FolderIcon, FileTextIcon, FileSpreadsheetIcon, FileAudioIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FileItem } from "./file-grid"

interface PreviewPanelProps {
  file: FileItem | null
  onClose: () => void
}

export function PreviewPanel({ file, onClose }: PreviewPanelProps) {
  if (!file) return null

  const isPreviewable = (file: FileItem) => {
    if (file.type === "file") {
      const previewableExtensions = ["jpg", "jpeg", "png", "gif", "txt", "mp3", "wav", "xlsx", "xls", "docx", "doc"]
      return file.extension && previewableExtensions.includes(file.extension)
    }
    return false
  }

  const renderPreview = () => {
    if (file.type === "folder") {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <FolderIcon className="h-32 w-32 text-yellow-400" />
          <h3 className="mt-4 text-xl font-semibold">{file.name}</h3>
        </div>
      )
    }

    if (!file.extension) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <FileIcon className="h-32 w-32 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold">{file.name}</h3>
        </div>
      )
    }

    switch (file.extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <div className="flex items-center justify-center p-4 h-full">
            <img
              src={file.thumbnail || "/placeholder.svg?height=300&width=400"}
              alt={file.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )
      case "mp3":
      case "wav":
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <FileAudioIcon className="h-32 w-32 text-purple-500" />
            <h3 className="mt-4 text-xl font-semibold">{file.name}</h3>
            <audio controls className="mt-4 w-full">
              <source src={file.path || "#"} type={`audio/${file.extension}`} />
              Your browser does not support the audio element.
            </audio>
          </div>
        )
      case "txt":
        return (
          <div className="p-4">
            <FileTextIcon className="h-16 w-16 text-gray-500 mb-4" />
            <div className="border p-4 rounded bg-gray-50 dark:bg-gray-800">
              <p>This is a preview of the text file content.</p>
              <p>In a real application, the actual content would be loaded here.</p>
            </div>
          </div>
        )
      case "xlsx":
      case "xls":
        return (
          <div className="p-4">
            <FileSpreadsheetIcon className="h-16 w-16 text-green-600 mb-4" />
            <div className="border p-4 rounded bg-gray-50 dark:bg-gray-800">
              <p>Spreadsheet preview would be shown here.</p>
              <p>In a real application, a table representation would be displayed.</p>
            </div>
          </div>
        )
      case "docx":
      case "doc":
        return (
          <div className="p-4">
            <FileIcon className="h-16 w-16 text-blue-600 mb-4" />
            <div className="border p-4 rounded bg-gray-50 dark:bg-gray-800">
              <p>Document preview would be shown here.</p>
              <p>In a real application, the document content would be rendered.</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <FileIcon className="h-32 w-32 text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold">{file.name}</h3>
            <p className="text-gray-500">Preview not available</p>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{file.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">{renderPreview()}</ScrollArea>

        <div className="border-t p-4 bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p>{file.type === "folder" ? "Folder" : `${file.extension?.toUpperCase() || "Unknown"} File`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Size</p>
              <p>{file.size || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p>{file.created || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Modified</p>
              <p>{file.modified || "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
