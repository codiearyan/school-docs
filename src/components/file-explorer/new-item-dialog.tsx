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

interface NewItemDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateItem: (name: string) => void
  itemType: "folder" | "file" | null
}

export function NewItemDialog({ isOpen, onClose, onCreateItem, itemType }: NewItemDialogProps) {
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    if (isOpen) {
      setName(itemType === "file" ? "New Text Document.txt" : "New Folder")
    }
  }, [isOpen, itemType])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onCreateItem(name.trim())
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new {itemType}</DialogTitle>
            <DialogDescription>Enter a name for the new {itemType}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              autoFocus
              // Select the name without extension for files
              onFocus={(e) => {
                if (itemType === "file") {
                  const lastDotIndex = e.target.value.lastIndexOf(".")
                  if (lastDotIndex !== -1) {
                    e.target.setSelectionRange(0, lastDotIndex)
                  }
                } else {
                  e.target.select()
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
