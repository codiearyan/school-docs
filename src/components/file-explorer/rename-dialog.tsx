"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { FileItem } from "./file-grid"

interface RenameDialogProps {
  isOpen: boolean
  onClose: () => void
  onRename: (newName: string) => void
  file: FileItem | null
}

export function RenameDialog({ isOpen, onClose, onRename, file }: RenameDialogProps) {
  const [newName, setNewName] = React.useState("")

  React.useEffect(() => {
    if (file) {
      setNewName(file.name)
    }
  }, [file])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim()) {
      onRename(newName.trim())
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename {file?.type}</DialogTitle>
            <DialogDescription>Enter a new name for {file?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full" autoFocus />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Rename</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
