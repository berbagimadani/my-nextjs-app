import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { fetchFile } from "@/lib/actions/fetchfile";  
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenuButton,
} from "../ui/sidebar";
import { ChevronsUpDown, Search, Trash, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { redirect } from "next/navigation";
import { Label } from "../ui/label";
import { Suspense } from 'react';
 

export async function ListFiles() { 
  

  const response = await fetch('/api/files/getAll', {
      cache: 'no-store',
    });
  
  const files = await response.json();

  const truncateString = (str: string, maxLength: number) => {
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };

  const clickViewDetail = (file: string) => {
    redirect(`/files/${file}`);
  };

  function handleSearch(term: string) {
    console.log(term); 
  }
 

  return (
    <Card className="pb-4">
      <CardHeader>
        <CardTitle>Table files</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 h-auto">
        <div className="flex pb-4">
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search the docs..."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="pl-8 bg-content"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <Suspense fallback={<p className="h-100 text-2xl text-red-600">Loading...</p>}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file: any) => (
            <div
              key={file.id}
              className="flex flex-col items-center space-y-2 p-4 border rounded-md shadow-sm relative"
            >
              {/* Avatar dengan gambar */}
              <div className="relative w-24 h-24 rounded-md overflow-hidden">
                <Image
                  src={file.url || "/fallback-image.png"}
                  alt={file.filename || "Fallback"}
                  width={200}
                  height={100}
                  style={{
                    objectFit: "cover",
                  }}
                  priority={true}
                />
              </div>
              {/* Teks nama file */}
              <p className="text-center text-sm font-medium break-words max-w-full">
                {truncateString(file.filename, 20)}
              </p>

              <div className="absolute right-5 -top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width]"
                    align="end"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => {
                        clickViewDetail(file.fileid);
                      }}
                    >
                      <View />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => {}}
                    >
                      <Trash />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        </Suspense>
      </CardContent>
    </Card>
  );
}
