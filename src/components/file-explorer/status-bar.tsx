import type { FileItem } from "./file-grid"

interface StatusBarProps {
  items: FileItem[]
  selectedFiles: FileItem[]
}

export function StatusBar({ items, selectedFiles }: StatusBarProps) {
  const itemCount = items.length
  const selectedText =
    selectedFiles.length > 0 ? `${selectedFiles.length} ${selectedFiles.length === 1 ? "item" : "items"} selected` : ""

  return (
    <div className="flex h-8 items-center justify-between border-t bg-gray-50 px-4 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div>{itemCount} items</div>
      <div>{selectedText}</div>
    </div>
  )
}
