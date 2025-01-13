import { AppSidebar } from "@/components/app-sidebar"
import { CardDemo } from "@/components/card"
import { ChartDemo } from "@/components/chart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"  
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar" 

const summary = [
  {
    title: "Total Revenue",
    total: "4500000",
  },
  {
    title: "Total Subscribe",
    total: "4000",
  },
  {
    title: "Total Invoice",
    total: "4500",
  },
  {
    title: "Total Return",
    total: "45",
  },
]

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
           <div className="grid grid-cols-4 gap-2">
             {summary.map((summaryItem, index) => (
               <div key={index} className="flex flex-col space-y-2">
                  <CardDemo title={summaryItem.title} total={summaryItem.total} />
                </div>
              ))}  
           </div>

           <ChartDemo />
        </div>
        <footer className="flex flex-col gap-2 p-2 border-t">
          <p className="text-sm text-gray-500">�� 2022 Your Company. All rights reserved.</p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
