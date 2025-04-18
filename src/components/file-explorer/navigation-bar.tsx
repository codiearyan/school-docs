"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, ArrowUp, RotateCw, Search, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavigationBarProps {
  onBack: () => void
  onForward: () => void
  onUp: () => void
  onRefresh: () => void
  canGoBack: boolean
  canGoForward: boolean
  canGoUp: boolean
  currentPath: string
  pathSegments: string[]
  onPathSegmentClick: (index: number) => void
  onSearch: (query: string) => void
}

export function NavigationBar({
  onBack,
  onForward,
  onUp,
  onRefresh,
  canGoBack,
  canGoForward,
  canGoUp,
  currentPath,
  pathSegments,
  onPathSegmentClick,
  onSearch,
}: NavigationBarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  // Focus search input when Ctrl+F is pressed
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex-1 flex flex-wrap items-center gap-2 p-2">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          disabled={!canGoBack}
          className="h-8 w-8"
          title="Back (Alt+Left)"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onForward}
          disabled={!canGoForward}
          className="h-8 w-8"
          title="Forward (Alt+Right)"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onUp} disabled={!canGoUp} className="h-8 w-8" title="Up (Alt+Up)">
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onRefresh} className="h-8 w-8" title="Refresh (F5)">
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 hidden sm:block" />

      <div className="relative flex-1 min-w-[200px]">
        <div className="flex items-center border rounded-md">
          <Input value={currentPath} readOnly className="h-8 border-0 focus-visible:ring-0" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {pathSegments.map((segment, index) => (
                <DropdownMenuItem key={index} onClick={() => onPathSegmentClick(index)}>
                  {segment}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative w-full sm:w-64">
        <Input
          ref={searchInputRef}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 pr-8"
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
