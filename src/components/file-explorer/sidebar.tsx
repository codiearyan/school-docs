"use client"

import type * as React from "react"
import { ChevronDown, Computer, FolderIcon, HardDrive, Home, Cloud, Network, Tag } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data for the file tree
const fileTree = {
  quickAccess: [
    { name: "Home", icon: Home },
    { name: "Desktop", icon: Computer },
    { name: "Downloads", icon: FolderIcon },
    { name: "Documents", icon: FolderIcon },
    { name: "Music", icon: FolderIcon },
    { name: "Recycle Bin", icon: FolderIcon },
  ],
  drives: [
    { name: "Windows (C:)", icon: HardDrive },
    { name: "DVD Rom (D:)", icon: HardDrive },
    { name: "Projects (P:)", icon: HardDrive },
  ],
  cloudStorage: [
    { name: "OneDrive", icon: Cloud },
    { name: "iCloud", icon: Cloud },
    { name: "Google Drive", icon: Cloud },
  ],
  network: [{ name: "Network", icon: Network }],
  tags: [
    { name: "Work", icon: Tag },
    { name: "Personal", icon: Tag },
    { name: "Important", icon: Tag },
  ],
}

export function FileExplorerSidebar({
  onFolderSelect,
  ...props
}: {
  onFolderSelect: (folder: string) => void
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pinned</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fileTree.quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton onClick={() => onFolderSelect(item.name)}>
                    <item.icon className="text-blue-500" />
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                Drives
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=closed]/collapsible:rotate-[-90deg]" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fileTree.drives.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton onClick={() => onFolderSelect(item.name)}>
                        <item.icon className="text-gray-500" />
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                Cloud Storage
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=closed]/collapsible:rotate-[-90deg]" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fileTree.cloudStorage.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton onClick={() => onFolderSelect(item.name)}>
                        <item.icon className="text-blue-400" />
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                Network
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=closed]/collapsible:rotate-[-90deg]" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fileTree.network.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton onClick={() => onFolderSelect(item.name)}>
                        <item.icon className="text-gray-500" />
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                Tags
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=closed]/collapsible:rotate-[-90deg]" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fileTree.tags.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton onClick={() => onFolderSelect(item.name)}>
                        <item.icon className="text-yellow-500" />
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
