"use client"

import * as React from "react"
import { ChevronRight, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BreadcrumbNavProps {
  path: string[]
  onNavigate: (index: number) => void
}

export function BreadcrumbNav({ path, onNavigate }: BreadcrumbNavProps) {
  // For mobile responsiveness, we'll show a dropdown for paths that don't fit
  const [visiblePaths, setVisiblePaths] = React.useState<string[]>(path)
  const [hiddenPaths, setHiddenPaths] = React.useState<{ index: number; name: string }[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Recalculate visible paths when window resizes or path changes
  React.useEffect(() => {
    const calculateVisiblePaths = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const homeButtonWidth = 40 // Approximate width of home button
      const chevronWidth = 20 // Approximate width of chevron
      const dropdownWidth = 40 // Approximate width of dropdown button

      let availableWidth = containerWidth - homeButtonWidth

      // Start with all paths visible
      const visible: string[] = []
      const hidden: { index: number; name: string }[] = []

      // Always show the last path segment
      const lastSegment = path[path.length - 1]
      const lastSegmentWidth = estimateTextWidth(lastSegment) + chevronWidth
      availableWidth -= lastSegmentWidth

      // Add paths from the beginning until we run out of space
      for (let i = 0; i < path.length - 1; i++) {
        const segmentWidth = estimateTextWidth(path[i]) + chevronWidth

        if (availableWidth - segmentWidth > (hidden.length ? dropdownWidth : 0)) {
          visible.push(path[i])
          availableWidth -= segmentWidth
        } else {
          // If we can't fit this segment, add it and all remaining segments to hidden
          for (let j = i; j < path.length - 1; j++) {
            hidden.push({ index: j, name: path[j] })
          }
          break
        }
      }

      // Always add the last segment
      visible.push(lastSegment)

      setVisiblePaths(visible)
      setHiddenPaths(hidden)
    }

    // Estimate text width (rough approximation)
    const estimateTextWidth = (text: string) => {
      return text.length * 8 + 20 // 8px per character + padding
    }

    calculateVisiblePaths()

    window.addEventListener("resize", calculateVisiblePaths)
    return () => window.removeEventListener("resize", calculateVisiblePaths)
  }, [path])

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-1 px-2 py-1 overflow-hidden min-w-[200px] border-r sm:border-r-0"
    >
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onNavigate(0)}>
        <Home className="h-4 w-4" />
      </Button>

      {hiddenPaths.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-1">
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {hiddenPaths.map((item) => (
              <DropdownMenuItem key={item.index} onClick={() => onNavigate(item.index + 1)}>
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {visiblePaths.map((segment, index) => {
        // Calculate the actual index in the original path array
        const actualIndex = path.indexOf(segment)

        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" />}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 py-0 truncate max-w-[150px]"
              onClick={() => onNavigate(actualIndex + 1)}
            >
              {segment}
            </Button>
          </React.Fragment>
        )
      })}
    </div>
  )
}
