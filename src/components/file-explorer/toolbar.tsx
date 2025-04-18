"use client"
import {
  FilePlus,
  FolderPlus,
  Copy,
  Scissors,
  Trash2,
  Edit,
  MoreHorizontal,
  ChevronDown,
  Grid,
  List,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { FileItem } from "./file-grid"

interface ToolbarProps {
  onAction: (action: string) => void
  selectedFiles: FileItem[]
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function Toolbar({ onAction, selectedFiles, viewMode, onViewModeChange }: ToolbarProps) {
  const isItemSelected = selectedFiles.length > 0
  const multipleSelected = selectedFiles.length > 1

  return (
    <div className="flex items-center justify-between gap-1 border-b p-1">
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <FilePlus className="h-4 w-4" />
              New
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onAction("newFolder")}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Folder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("newTextFile")}>
              <FilePlus className="mr-2 h-4 w-4" />
              Text Document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAction("rename")}
          disabled={!isItemSelected || multipleSelected}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => onAction("copy")} disabled={!isItemSelected}>
          <Copy className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => onAction("cut")} disabled={!isItemSelected}>
          <Scissors className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => onAction("delete")} disabled={!isItemSelected}>
          <Trash2 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAction("preview")}
          disabled={!isItemSelected || multipleSelected}
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && onViewModeChange(value as "grid" | "list")}
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
