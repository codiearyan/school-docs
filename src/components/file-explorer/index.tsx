"use client"

import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import { useTheme } from "next-themes"

import { FileGrid, type FileItem } from "@/components/file-explorer/file-grid"
import { Toolbar } from "@/components/file-explorer/toolbar"
import { BreadcrumbNav } from "@/components/file-explorer/breadcrumb-nav"
import { NavigationBar } from "@/components/file-explorer/navigation-bar"
import { RenameDialog } from "@/components/file-explorer/rename-dialog"
import { NewItemDialog } from "@/components/file-explorer/new-item-dialog"
import { StatusBar } from "@/components/file-explorer/status-bar"
import { PreviewPanel } from "@/components/file-explorer/preview-panel"
import { Button } from "@/components/ui/button"
import { Moon, Sun, HelpCircle } from "lucide-react"
import { KeyboardShortcutsDialog } from "@/components/file-explorer/keyboard-shortcuts-dialog"

// Sample data for the file explorer
const generateFiles = (location: string): FileItem[] => {
  if (location === "Documents") {
    return [
      {
        id: uuidv4(),
        name: "Adobe",
        type: "folder",
        created: "2022-01-15",
        modified: "2023-05-20",
      },
      {
        id: uuidv4(),
        name: "Design",
        type: "folder",
        created: "2022-02-10",
        modified: "2023-06-12",
      },
      {
        id: uuidv4(),
        name: "Fonts",
        type: "folder",
        created: "2022-03-05",
        modified: "2023-04-18",
      },
      {
        id: uuidv4(),
        name: "Project Files",
        type: "folder",
        created: "2022-04-22",
        modified: "2023-07-30",
      },
      {
        id: uuidv4(),
        name: "Templates",
        type: "folder",
        created: "2022-05-17",
        modified: "2023-08-05",
      },
      {
        id: uuidv4(),
        name: "Visual Studio",
        type: "folder",
        created: "2022-06-30",
        modified: "2023-09-12",
      },
      {
        id: uuidv4(),
        name: "IMG_2022_06_01.jpg",
        type: "file",
        extension: "jpg",
        size: "2.4 MB",
        created: "2022-06-01",
        modified: "2022-06-01",
        thumbnail: "/placeholder.svg?height=100&width=100",
        path: "/placeholder.svg?height=300&width=400",
      },
      {
        id: uuidv4(),
        name: "IMG_2022_06_02.jpg",
        type: "file",
        extension: "jpg",
        size: "3.1 MB",
        created: "2022-06-02",
        modified: "2022-06-02",
        thumbnail: "/placeholder.svg?height=100&width=100",
        path: "/placeholder.svg?height=300&width=400",
      },
      {
        id: uuidv4(),
        name: "IMG_2022_06_03.jpg",
        type: "file",
        extension: "jpg",
        size: "1.8 MB",
        created: "2022-06-03",
        modified: "2022-06-03",
        thumbnail: "/placeholder.svg?height=100&width=100",
        path: "/placeholder.svg?height=300&width=400",
      },
      {
        id: uuidv4(),
        name: "New Text Document.txt",
        type: "file",
        extension: "txt",
        size: "1 KB",
        created: "2023-04-15",
        modified: "2023-04-15",
      },
      {
        id: uuidv4(),
        name: "Untitled Document.docx",
        type: "file",
        extension: "docx",
        size: "24 KB",
        created: "2023-05-20",
        modified: "2023-05-20",
      },
      {
        id: uuidv4(),
        name: "History of Skateboarding.docx",
        type: "file",
        extension: "docx",
        size: "1.2 MB",
        created: "2023-03-10",
        modified: "2023-03-10",
      },
      {
        id: uuidv4(),
        name: "license.txt",
        type: "file",
        extension: "txt",
        size: "2 KB",
        created: "2023-01-05",
        modified: "2023-01-05",
      },
      {
        id: uuidv4(),
        name: "Focus Sessions.xlsx",
        type: "file",
        extension: "xlsx",
        size: "45 KB",
        created: "2023-06-12",
        modified: "2023-06-12",
      },
      {
        id: uuidv4(),
        name: "Untitled Spreadsheet.xlsx",
        type: "file",
        extension: "xlsx",
        size: "18 KB",
        created: "2023-07-08",
        modified: "2023-07-08",
      },
      {
        id: uuidv4(),
        name: "After Dark.mp3",
        type: "file",
        extension: "mp3",
        size: "8.2 MB",
        created: "2023-02-28",
        modified: "2023-02-28",
        path: "https://example.com/audio.mp3",
      },
      {
        id: uuidv4(),
        name: "poppins-regular.ttf",
        type: "file",
        extension: "ttf",
        size: "145 KB",
        created: "2022-12-15",
        modified: "2022-12-15",
      },
    ]
  } else if (location === "Desktop") {
    return [
      {
        id: uuidv4(),
        name: "My Projects",
        type: "folder",
        created: "2022-08-15",
        modified: "2023-07-20",
      },
      {
        id: uuidv4(),
        name: "Screenshots",
        type: "folder",
        created: "2022-09-10",
        modified: "2023-08-05",
      },
      {
        id: uuidv4(),
        name: "Resume.docx",
        type: "file",
        extension: "docx",
        size: "45 KB",
        created: "2023-05-10",
        modified: "2023-05-10",
      },
      {
        id: uuidv4(),
        name: "Budget.xlsx",
        type: "file",
        extension: "xlsx",
        size: "120 KB",
        created: "2023-06-15",
        modified: "2023-06-15",
      },
    ]
  } else if (location === "Downloads") {
    return [
      {
        id: uuidv4(),
        name: "setup.exe",
        type: "file",
        extension: "exe",
        size: "45 MB",
        created: "2023-07-10",
        modified: "2023-07-10",
      },
      {
        id: uuidv4(),
        name: "report.pdf",
        type: "file",
        extension: "pdf",
        size: "2.3 MB",
        created: "2023-07-05",
        modified: "2023-07-05",
      },
      {
        id: uuidv4(),
        name: "archive.zip",
        type: "file",
        extension: "zip",
        size: "156 MB",
        created: "2023-06-28",
        modified: "2023-06-28",
      },
    ]
  } else if (location.includes("/")) {
    // Handle subfolder navigation
    const parts = location.split("/")
    const folderName = parts[parts.length - 1]

    return [
      {
        id: uuidv4(),
        name: `${folderName} Subfolder 1`,
        type: "folder",
        created: "2023-01-15",
        modified: "2023-06-20",
      },
      {
        id: uuidv4(),
        name: `${folderName} Subfolder 2`,
        type: "folder",
        created: "2023-02-10",
        modified: "2023-07-12",
      },
      {
        id: uuidv4(),
        name: `Document in ${folderName}.docx`,
        type: "file",
        extension: "docx",
        size: "24 KB",
        created: "2023-08-15",
        modified: "2023-08-15",
      },
      {
        id: uuidv4(),
        name: `Image in ${folderName}.jpg`,
        type: "file",
        extension: "jpg",
        size: "1.5 MB",
        created: "2023-07-20",
        modified: "2023-07-20",
        thumbnail: "/placeholder.svg?height=100&width=100",
        path: "/placeholder.svg?height=300&width=400",
      },
    ]
  } else {
    // Default files for any other location
    return [
      {
        id: uuidv4(),
        name: "Documents",
        type: "folder",
        created: "2022-01-01",
        modified: "2023-09-01",
      },
      {
        id: uuidv4(),
        name: "Pictures",
        type: "folder",
        created: "2022-01-01",
        modified: "2023-08-15",
      },
      {
        id: uuidv4(),
        name: "Videos",
        type: "folder",
        created: "2022-01-01",
        modified: "2023-07-22",
      },
      {
        id: uuidv4(),
        name: "README.txt",
        type: "file",
        extension: "txt",
        size: "2 KB",
        created: "2023-01-01",
        modified: "2023-01-01",
      },
    ]
  }
}

export default function FileExplorer() {
  const { theme, setTheme } = useTheme()
  const [currentLocation, setCurrentLocation] = React.useState("Documents")
  const [navigationHistory, setNavigationHistory] = React.useState<string[]>(["Documents"])
  const [historyIndex, setHistoryIndex] = React.useState(0)
  const [files, setFiles] = React.useState<FileItem[]>(generateFiles("Documents"))
  const [selectedFiles, setSelectedFiles] = React.useState<FileItem[]>([])
  const [breadcrumbPath, setBreadcrumbPath] = React.useState<string[]>(["Documents"])
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [previewFile, setPreviewFile] = React.useState<FileItem | null>(null)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = React.useState(false)

  // Dialog states
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false)
  const [newItemDialogOpen, setNewItemDialogOpen] = React.useState(false)
  const [newItemType, setNewItemType] = React.useState<"folder" | "file" | null>(null)

  // Navigation functions
  const navigateToFolder = (folderName: string) => {
    setSelectedFiles([])
    setCurrentLocation(folderName)
    setBreadcrumbPath([folderName])
    setFiles(generateFiles(folderName))

    // Update navigation history
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), folderName]
    setNavigationHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const navigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const location = navigationHistory[newIndex]
      setHistoryIndex(newIndex)
      setCurrentLocation(location)

      // Update breadcrumb path based on location
      if (location.includes("/")) {
        setBreadcrumbPath(location.split("/"))
      } else {
        setBreadcrumbPath([location])
      }

      setFiles(generateFiles(location))
      setSelectedFiles([])
    }
  }

  const navigateForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1
      const location = navigationHistory[newIndex]
      setHistoryIndex(newIndex)
      setCurrentLocation(location)

      // Update breadcrumb path based on location
      if (location.includes("/")) {
        setBreadcrumbPath(location.split("/"))
      } else {
        setBreadcrumbPath([location])
      }

      setFiles(generateFiles(location))
      setSelectedFiles([])
    }
  }

  const navigateUp = () => {
    if (breadcrumbPath.length > 1) {
      const newPath = [...breadcrumbPath]
      newPath.pop()
      const newLocation = newPath.join("/")

      setCurrentLocation(newLocation)
      setBreadcrumbPath(newPath)
      setFiles(generateFiles(newLocation))
      setSelectedFiles([])

      // Update navigation history
      const newHistory = [...navigationHistory.slice(0, historyIndex + 1), newLocation]
      setNavigationHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    } else {
      // If we're at the root, navigate to Documents as a fallback
      navigateToFolder("Documents")
    }
  }

  const refreshCurrentFolder = () => {
    setFiles(generateFiles(currentLocation))
    setSelectedFiles([])
  }

  const handleBreadcrumbNavigate = (index: number) => {
    if (index === 0) {
      navigateToFolder("Documents")
    } else {
      // Navigate to the path up to this index
      const newPath = breadcrumbPath.slice(0, index)
      const newLocation = newPath.join("/")

      setCurrentLocation(newLocation)
      setBreadcrumbPath(newPath)
      setFiles(generateFiles(newLocation))
      setSelectedFiles([])

      // Update navigation history
      const newHistory = [...navigationHistory.slice(0, historyIndex + 1), newLocation]
      setNavigationHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const handlePathSegmentClick = (index: number) => {
    // Similar to breadcrumb navigation but for the path dropdown
    if (index === 0) {
      navigateToFolder("Documents")
    } else if (index < breadcrumbPath.length) {
      const newPath = breadcrumbPath.slice(0, index + 1)
      const newLocation = newPath.join("/")

      setCurrentLocation(newLocation)
      setBreadcrumbPath(newPath)
      setFiles(generateFiles(newLocation))
      setSelectedFiles([])

      // Update navigation history
      const newHistory = [...navigationHistory.slice(0, historyIndex + 1), newLocation]
      setNavigationHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const handleSearch = (query: string) => {
    if (!query) {
      refreshCurrentFolder()
      return
    }

    // Filter files based on search query
    const allFiles = generateFiles(currentLocation)
    const filteredFiles = allFiles.filter((file) => file.name.toLowerCase().includes(query.toLowerCase()))
    setFiles(filteredFiles)
  }

  // File operations
  const handleFileOpen = (file: FileItem) => {
    // In a real app, we would open the file with the appropriate application
    console.log(`Opening file: ${file.name}`)
    // For now, let's preview the file
    setPreviewFile(file)
  }

  const handleFolderOpen = (folder: FileItem) => {
    // Navigate to the folder
    const newPath = [...breadcrumbPath, folder.name]
    setBreadcrumbPath(newPath)
    const newLocation = `${currentLocation}/${folder.name}`
    setCurrentLocation(newLocation)
    setFiles(generateFiles(newLocation))
    setSelectedFiles([])

    // Update navigation history
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), newLocation]
    setNavigationHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case "rename":
        setSelectedFiles([file])
        setRenameDialogOpen(true)
        break
      case "copy":
        console.log(`Copying: ${file.name}`)
        break
      case "cut":
        console.log(`Cutting: ${file.name}`)
        break
      case "delete":
        // Remove the file from the list
        setFiles(files.filter((f) => f.id !== file.id))
        setSelectedFiles(selectedFiles.filter((f) => f.id !== file.id))
        break
      default:
        break
    }
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "rename":
        if (selectedFiles.length === 1) {
          setRenameDialogOpen(true)
        }
        break
      case "copy":
        console.log(`Copying ${selectedFiles.length} items`)
        break
      case "cut":
        console.log(`Cutting ${selectedFiles.length} items`)
        break
      case "delete":
        // Remove selected files from the list
        const selectedIds = new Set(selectedFiles.map((f) => f.id))
        setFiles(files.filter((f) => !selectedIds.has(f.id)))
        setSelectedFiles([])
        break
      case "newFolder":
        setNewItemType("folder")
        setNewItemDialogOpen(true)
        break
      case "newTextFile":
        setNewItemType("file")
        setNewItemDialogOpen(true)
        break
      case "preview":
        if (selectedFiles.length === 1) {
          setPreviewFile(selectedFiles[0])
        }
        break
      default:
        break
    }
  }

  const handleRename = (newName: string) => {
    if (selectedFiles.length === 1) {
      const fileToRename = selectedFiles[0]
      setFiles(files.map((file) => (file.id === fileToRename.id ? { ...file, name: newName } : file)))
      setSelectedFiles([{ ...fileToRename, name: newName }])
      setRenameDialogOpen(false)
    }
  }

  const handleCreateItem = (name: string) => {
    if (newItemType === "folder") {
      const newFolder: FileItem = {
        id: uuidv4(),
        name,
        type: "folder",
        created: new Date().toISOString().split("T")[0],
        modified: new Date().toISOString().split("T")[0],
      }
      setFiles([newFolder, ...files])
    } else if (newItemType === "file") {
      const extension = name.includes(".") ? name.split(".").pop() || "txt" : "txt"
      const newFile: FileItem = {
        id: uuidv4(),
        name,
        type: "file",
        extension,
        size: "0 KB",
        created: new Date().toISOString().split("T")[0],
        modified: new Date().toISOString().split("T")[0],
      }
      setFiles([...files, newFile])
    }
    setNewItemDialogOpen(false)
    setNewItemType(null)
  }

  const handlePreview = (file: FileItem) => {
    setPreviewFile(file)
  }

  const handleDrop = (targetFolder: FileItem, droppedFiles: FileItem[]) => {
    // In a real app, we would move the files to the target folder
    console.log(`Moving ${droppedFiles.length} files to ${targetFolder.name}`)

    // Remove the dropped files from the current folder
    const droppedIds = new Set(droppedFiles.map((f) => f.id))
    setFiles(files.filter((f) => !droppedIds.has(f.id)))
    setSelectedFiles([])
  }

  const refreshCurrentFolderMemoized = React.useCallback(() => {
    setFiles(generateFiles(currentLocation))
    setSelectedFiles([])
  }, [currentLocation])

  // Global keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F for search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }

      // F1 for keyboard shortcuts help
      if (e.key === "F1") {
        e.preventDefault()
        setShowKeyboardShortcuts(true)
      }

      // Escape to close preview
      if (e.key === "Escape" && previewFile) {
        e.preventDefault()
        setPreviewFile(null)
      }

      // Ctrl+C for copy
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && selectedFiles.length > 0) {
        e.preventDefault()
        console.log(`Copying ${selectedFiles.length} items`)
      }

      // Ctrl+X for cut
      if ((e.ctrlKey || e.metaKey) && e.key === "x" && selectedFiles.length > 0) {
        e.preventDefault()
        console.log(`Cutting ${selectedFiles.length} items`)
      }

      // Ctrl+V for paste
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault()
        console.log("Pasting items")
      }

      // Alt+Left for back
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault()
        navigateBack()
      }

      // Alt+Right for forward
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault()
        navigateForward()
      }

      // Alt+Up for navigate up
      if (e.altKey && e.key === "ArrowUp") {
        e.preventDefault()
        navigateUp()
      }

      // F5 for refresh
      if (e.key === "F5") {
        e.preventDefault()
        refreshCurrentFolderMemoized()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [refreshCurrentFolderMemoized, selectedFiles, previewFile])

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">File Explorer</h1>
          <Button variant="ghost" size="sm" onClick={() => setShowKeyboardShortcuts(true)}>
            <HelpCircle className="h-4 w-4 mr-1" />
            Keyboard Shortcuts
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start border-b">
        <BreadcrumbNav path={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />

        <NavigationBar
          onBack={navigateBack}
          onForward={navigateForward}
          onUp={navigateUp}
          onRefresh={refreshCurrentFolder}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < navigationHistory.length - 1}
          canGoUp={breadcrumbPath.length > 1}
          currentPath={breadcrumbPath.join(" > ")}
          pathSegments={breadcrumbPath}
          onPathSegmentClick={handlePathSegmentClick}
          onSearch={handleSearch}
        />
      </div>

      <Toolbar
        onAction={handleToolbarAction}
        selectedFiles={selectedFiles}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex-1 overflow-hidden">
        <FileGrid
          files={files}
          onFileOpen={handleFileOpen}
          onFolderOpen={handleFolderOpen}
          onFileAction={handleFileAction}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          viewMode={viewMode}
          onPreview={handlePreview}
          onDrop={handleDrop}
        />
      </div>

      <StatusBar items={files} selectedFiles={selectedFiles} />

      {/* Dialogs */}
      <RenameDialog
        isOpen={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        onRename={handleRename}
        file={selectedFiles[0] || null}
      />

      <NewItemDialog
        isOpen={newItemDialogOpen}
        onClose={() => setNewItemDialogOpen(false)}
        onCreateItem={handleCreateItem}
        itemType={newItemType}
      />

      {/* Preview Panel */}
      {previewFile && <PreviewPanel file={previewFile} onClose={() => setPreviewFile(null)} />}

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsDialog isOpen={showKeyboardShortcuts} onClose={() => setShowKeyboardShortcuts(false)} />
    </div>
  )
}
