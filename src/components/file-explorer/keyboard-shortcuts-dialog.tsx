"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface KeyboardShortcutsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcutsDialog({ isOpen, onClose }: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>Keyboard shortcuts to help you navigate the file explorer.</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Navigation</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Navigate back</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + ←</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Navigate forward</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + →</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Navigate up</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + ↑</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Refresh</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">F5</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Open selected item</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Enter</kbd>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Selection</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Select all</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl + A</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Select multiple items</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl + Click</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Select range</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Shift + Click</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Clear selection</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Navigate selection</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Arrow keys</kbd>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">File Operations</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Copy</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl + C</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Cut</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl + X</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Paste</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl + V</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Delete</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Delete</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Preview</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Space</kbd>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Other</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Search</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl + F</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Show keyboard shortcuts</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">F1</kbd>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
