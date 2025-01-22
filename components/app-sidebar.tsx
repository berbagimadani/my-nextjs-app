import * as React from "react"
import { ChevronRight, SquareTerminal } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Energy Management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Energy Consumption Overview",
          url: "about",
        },
        {
          title: "Energy Consumption Statistics",
          url: "content" 
        },
        {
          title: "Energy Consumption Analysis",
          url: "#"
        }, 
        {
          title: "Energy Flow Direction",
          url: "#"
        }, 
        {
          title: "Files",
          url: "files", 
        }, 
      ],
    },
    {
      title: "Distribution Power",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "10kV Monitoring",
          url: "about",
        },
        {
          title: "400kV Monitoring",
          url: "content", 
        },
        {
          title: "Transformer",
          url: "content", 
        }, 
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Energy Consumption Report",
          url: "about",
        },
        {
          title: "Distribution Report",
          url: "#", 
        }, 
      ],
    },
    {
      title: "Alarm Warning",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Energy Consumption Report",
          url: "about",
        },
        {
          title: "Distribution Report",
          url: "about", 
        }, 
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title} 
            defaultOpen={item.isActive} 
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.icon && <item.icon />}
                  <span className="ml-2">{item.title}{" "}</span>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild> 
                          <Link className="p-4 hover:bg-gray-700" href={item.url}>
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
