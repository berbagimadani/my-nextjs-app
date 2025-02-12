// /app/components/Layout.tsx
import { FC } from 'react'; 
import { AppSidebar } from "@/components/app-sidebar"
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
// import { ModeToggle } from '@/components/mode-toggle';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider >
    <AppSidebar />
    <SidebarInset>
      <header className="flex sticky top-0 bg-content h-16 shrink-0 items-center gap-2 border-b px-4 bg-background z-50">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-content">
        {/* <ModeToggle></ModeToggle> */}
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
};

export default Layout;
