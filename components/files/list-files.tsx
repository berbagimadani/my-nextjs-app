import Image from "next/image";
// import { fetchFile } from "@/lib/actions/fetchfile";
import {
  SidebarGroup,
  SidebarGroupContent, 
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Dropdown from "./dropdown-item";
import SearchInput from "./search-input";

export async function ListFiles({
  page,
  search,
  cache,
}: {
  page: number;
  search: string;
  cache: string;
}) {
  const response = await fetch(
    `http://localhost:3000/api/files/getAll?page=${page}&search=${search}`,
      //next: { revalidate: 60 },
      //cache: "no-store",
      cache === "false"
      ? { cache: "no-store" } // Memaksa fetch data tanpa cache
      : { next: { revalidate: 90 } } // ISR dengan cache 60 detik
  );

  const files = await response.json();

  const truncateString = (str: string, maxLength: number) => {
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };
 

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
              <SearchInput></SearchInput>
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
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
                   
                    <Dropdown options={file.fileid} />

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Links */}

        <div className="flex space-x-4 mt-4">
          <Link
            href={`?page=${page > 1 ? page - 1 : 1}&search=${encodeURIComponent(
              search
            )}`} 
          >
            Previous
          </Link>
          <span>Page {page}</span>
          <Link href={`?page=${page + 1}&search=${encodeURIComponent(search)}`}>
            Next
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
