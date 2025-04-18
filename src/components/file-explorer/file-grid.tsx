"use client"
import * as React from "react"
import {
  FileIcon,
  FolderIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileImageIcon,
  FileAudioIcon,
  FileIcon as FilePresentationIcon,
  FileTypeIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export type FileItem = {
  id: string
  name: string
  type: "folder" | "file"
  extension?: string
  size?: string
  modified?: string
  created?: string
  thumbnail?: string
  path?: string
}

interface FileGridProps {
  files: FileItem[]
  onFileOpen: (file: FileItem) => void
  onFolderOpen: (folder: FileItem) => void
  onFileAction: (action: string, file: FileItem) => void
  selectedFiles: FileItem[]
  setSelectedFiles: (files: FileItem[]) => void
  viewMode: "grid" | "list"
  onPreview: (file: FileItem) => void
  onDrop: (targetFolder: FileItem, droppedFiles: FileItem[]) => void
}

export function FileGrid({
  files,
  onFileOpen,
  onFolderOpen,
  onFileAction,
  selectedFiles,
  setSelectedFiles,
  viewMode,
  onPreview,
  onDrop,
}: FileGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [selectionStart, setSelectionStart] = React.useState<{ x: number; y: number } | null>(null)
  const [selectionEnd, setSelectionEnd] = React.useState<{ x: number; y: number } | null>(null)
  const [isSelecting, setIsSelecting] = React.useState(false)
  const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(null)
  const [lastClickedIndex, setLastClickedIndex] = React.useState<number | null>(null)
  const [draggedFiles, setDraggedFiles] = React.useState<FileItem[]>([])
  const [dragOverFolder, setDragOverFolder] = React.useState<string | null>(null)

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return <FolderIcon className="h-10 w-10 text-yellow-400" />

    if (file.thumbnail) {
      return (
        <div className="h-10 w-10 overflow-hidden rounded">
          <img src={file.thumbnail || "/placeholder.svg"} alt={file.name} className="h-full w-full object-cover" />
        </div>
      )
    }

    switch (file.extension) {
      case "txt":
        return <FileTextIcon className="h-10 w-10 text-gray-500" />
      case "xlsx":
      case "xls":
        return <FileSpreadsheetIcon className="h-10 w-10 text-green-600" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImageIcon className="h-10 w-10 text-blue-500" />
      case "mp3":
      case "wav":
        return <FileAudioIcon className="h-10 w-10 text-purple-500" />
      case "pptx":
      case "ppt":
        return <FilePresentationIcon className="h-10 w-10 text-orange-500" />
      case "docx":
      case "doc":
        return <FileIcon className="h-10 w-10 text-blue-600" />
      default:
        return <FileTypeIcon className="h-10 w-10 text-gray-400" />
    }
  }

  const handleItemClick = (file: FileItem, index: number, event: React.MouseEvent) => {
    // Handle multi-selection with Ctrl key
    if (event.ctrlKey || event.metaKey) {
      if (selectedFiles.some((f) => f.id === file.id)) {
        setSelectedFiles(selectedFiles.filter((f) => f.id !== file.id))
      } else {
        setSelectedFiles([...selectedFiles, file])
      }
      setLastClickedItem(file.id)
      setLastClickedIndex(index)
    }
    // Handle range selection with Shift key
    else if (event.shiftKey && lastClickedIndex !== null) {
      const currentIndex = index
      const start = Math.min(currentIndex, lastClickedIndex)
      const end = Math.max(currentIndex, lastClickedIndex)

      const rangeSelection = files.slice(start, end + 1)
      setSelectedFiles(rangeSelection)
    }
    // Normal selection
    else {
      setSelectedFiles([file])
      setLastClickedItem(file.id)
      setLastClickedIndex(index)
    }
  }

  const handleItemDoubleClick = (file: FileItem) => {
    if (file.type === "folder") {
      onFolderOpen(file)
    } else {
      onFileOpen(file)
    }
  }

  // Handle selection box
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start selection if clicking on the container background, not on an item
    if ((e.target as HTMLElement).closest("[data-file-item]")) {
      return
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setSelectionStart({ x, y })
      setSelectionEnd({ x, y })
      setIsSelecting(true)

      // Clear selection if not holding Ctrl
      if (!e.ctrlKey && !e.metaKey) {
        setSelectedFiles([])
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting && containerRef.current && selectionStart) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setSelectionEnd({ x, y })

      // Calculate which items are in the selection box
      const selectionRect = {
        left: Math.min(selectionStart.x, x),
        top: Math.min(selectionStart.y, y),
        right: Math.max(selectionStart.x, x),
        bottom: Math.max(selectionStart.y, y),
      }

      // Check each file item if it's in the selection box
      const fileItems = containerRef.current.querySelectorAll("[data-file-item]")
      const selectedIds = new Set<string>()

      fileItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        const relativeRect = {
          left: itemRect.left - rect.left,
          top: itemRect.top - rect.top,
          right: itemRect.right - rect.left,
          bottom: itemRect.bottom - rect.top,
        }

        // Check if the item intersects with the selection box
        if (
          relativeRect.left < selectionRect.right &&
          relativeRect.right > selectionRect.left &&
          relativeRect.top < selectionRect.bottom &&
          relativeRect.bottom > selectionRect.top
        ) {
          const id = item.getAttribute("data-file-id")
          if (id) selectedIds.add(id)
        }
      })

      // Update selected files
      const newSelectedFiles = files.filter((file) => selectedIds.has(file.id))
      setSelectedFiles(newSelectedFiles)
    }
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
    setSelectionStart(null)
    setSelectionEnd(null)
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, file: FileItem) => {
    // If the file is not in the selected files, select only this file
    if (!selectedFiles.some((f) => f.id === file.id)) {
      setSelectedFiles([file])
      setDraggedFiles([file])
    } else {
      setDraggedFiles(selectedFiles)
    }

    // Set drag image
    if (e.dataTransfer) {
      // Create a custom drag image
      const dragPreview = document.createElement("div")
      dragPreview.className = "bg-white dark:bg-gray-800 p-2 rounded shadow-lg border"

      if (selectedFiles.length > 1) {
        dragPreview.textContent = `${selectedFiles.length} items`
      } else {
        dragPreview.textContent = file.name
      }

      document.body.appendChild(dragPreview)
      e.dataTransfer.setDragImage(dragPreview, 0, 0)

      // Clean up after drag operation
      setTimeout(() => {
        document.body.removeChild(dragPreview)
      }, 0)

      e.dataTransfer.setData("text/plain", JSON.stringify(selectedFiles.map((f) => f.id)))
    }
  }

  const handleDragOver = (e: React.DragEvent, file: FileItem) => {
    e.preventDefault()
    // Only allow dropping on folders
    if (file.type === "folder") {
      setDragOverFolder(file.id)
    }
  }

  const handleDragLeave = () => {
    setDragOverFolder(null)
  }

  const handleDrop = (e: React.DragEvent, targetFolder: FileItem) => {
    e.preventDefault()
    setDragOverFolder(null)

    // Only allow dropping on folders
    if (targetFolder.type === "folder") {
      onDrop(targetFolder, draggedFiles)
    }
  }

  // Handle keyboard events for selection, preview, and navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space for preview
      if (e.code === "Space" && selectedFiles.length === 1) {
        e.preventDefault()
        onPreview(selectedFiles[0])
      }

      // Delete for deletion
      if (e.key === "Delete" && selectedFiles.length > 0) {
        e.preventDefault()
        selectedFiles.forEach((file) => {
          onFileAction("delete", file)
        })
      }

      // Ctrl+A for select all
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault()
        setSelectedFiles([...files])
      }

      // Escape to clear selection
      if (e.key === "Escape") {
        e.preventDefault()
        setSelectedFiles([])
      }

      // Arrow keys for navigation
      if (e.key.startsWith("Arrow") && files.length > 0) {
        e.preventDefault()

        // If no file is selected, select the first one
        if (selectedFiles.length === 0) {
          setSelectedFiles([files[0]])
          setLastClickedIndex(0)
          return
        }

        // Get the index of the last selected file
        const currentIndex =
          lastClickedIndex !== null
            ? lastClickedIndex
            : files.findIndex((f) => f.id === selectedFiles[selectedFiles.length - 1].id)
        if (currentIndex === -1) return

        let newIndex = currentIndex
        const columns = viewMode === "grid" ? Math.floor(containerRef.current?.clientWidth || 0 / 150) || 4 : 1

        switch (e.key) {
          case "ArrowUp":
            newIndex = Math.max(0, viewMode === "grid" ? currentIndex - columns : currentIndex - 1)
            break
          case "ArrowDown":
            newIndex = Math.min(files.length - 1, viewMode === "grid" ? currentIndex + columns : currentIndex + 1)
            break
          case "ArrowLeft":
            newIndex = Math.max(0, currentIndex - 1)
            break
          case "ArrowRight":
            newIndex = Math.min(files.length - 1, currentIndex + 1)
            break
        }

        if (newIndex !== currentIndex) {
          const newFile = files[newIndex]

          // If shift is pressed, extend selection
          if (e.shiftKey) {
            const start = Math.min(newIndex, lastClickedIndex || 0)
            const end = Math.max(newIndex, lastClickedIndex || 0)
            setSelectedFiles(files.slice(start, end + 1))
          } else {
            setSelectedFiles([newFile])
          }

          setLastClickedIndex(newIndex)
          setLastClickedItem(newFile.id)

          // Scroll the item into view
          const fileItem = containerRef.current?.querySelector(`[data-file-id="${newFile.id}"]`)
          fileItem?.scrollIntoView({ block: "nearest" })
        }
      }

      // Enter to open
      if (e.key === "Enter" && selectedFiles.length === 1) {
        e.preventDefault()
        const file = selectedFiles[0]
        if (file.type === "folder") {
          onFolderOpen(file)
        } else {
          onFileOpen(file)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedFiles, files, onPreview, onFileAction, onFileOpen, onFolderOpen, lastClickedIndex, viewMode])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      tabIndex={0} // Make the container focusable for keyboard events
    >
      {/* Selection box */}
      {isSelecting && selectionStart && selectionEnd && (
        <div
          className="absolute border border-blue-500 bg-blue-500/20 pointer-events-none z-10"
          style={{
            left: Math.min(selectionStart.x, selectionEnd.x) + "px",
            top: Math.min(selectionStart.y, selectionEnd.y) + "px",
            width: Math.abs(selectionEnd.x - selectionStart.x) + "px",
            height: Math.abs(selectionEnd.y - selectionStart.y) + "px",
          }}
        />
      )}

      {/* File grid or list */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            : "flex flex-col divide-y",
        )}
      >
        {files.map((file, index) => (
          <ContextMenu key={file.id}>
            <ContextMenuTrigger>
              <div
                data-file-item
                data-file-id={file.id}
                className={cn(
                  viewMode === "grid"
                    ? "flex flex-col items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "flex items-center gap-3 p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  selectedFiles.some((f) => f.id === file.id) && "bg-blue-100 dark:bg-blue-900",
                  dragOverFolder === file.id && "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950",
                )}
                onClick={(e) => handleItemClick(file, index, e)}
                onDoubleClick={() => handleItemDoubleClick(file)}
                draggable
                onDragStart={(e) => handleDragStart(e, file)}
                onDragOver={(e) => handleDragOver(e, file)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, file)}
              >
                {getFileIcon(file)}
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "mt-2 max-w-full truncate text-center text-sm"
                      : "flex flex-1 items-center justify-between",
                  )}
                >
                  {viewMode === "grid" ? (
                    <span className="truncate">{file.name}</span>
                  ) : (
                    <>
                      <span className="truncate flex-1">{file.name}</span>
                      <span className="text-sm text-gray-500 w-24">{file.type}</span>
                      <span className="text-sm text-gray-500 w-24">{file.size}</span>
                      <span className="text-sm text-gray-500 w-32">{file.modified}</span>
                    </>
                  )}
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => (file.type === "folder" ? onFolderOpen(file) : onFileOpen(file))}>
                Open
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onPreview(file)}>Preview</ContextMenuItem>
              <ContextMenuItem onClick={() => onFileAction("rename", file)}>Rename</ContextMenuItem>
              <ContextMenuItem onClick={() => onFileAction("copy", file)}>Copy</ContextMenuItem>
              <ContextMenuItem onClick={() => onFileAction("cut", file)}>Cut</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => onFileAction("delete", file)} className="text-red-500">
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  )
}
