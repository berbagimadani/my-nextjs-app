"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { fetchFile } from "@/lib/actions/fetchfile";
import { useDataContext } from "@/context/DataContext";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
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

interface File {
  id: number;
  filename: string;
  url: string;
  fileid: string;
}

export function ListFilesBak() {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const currentSearch = searchParams?.get("search") || "";

  const [files, setFiles] = useState<File[]>([]);
  const { items } = useDataContext();
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);

  const fetchFiles = async (page: number, search: string) => {
    fetch(`/api/files/fetch-all?page=${page}&search=${search}`)
      .then((res) => res.json())
      .then((data) => setFiles(data));

    // const pageSize = 12;
    // try {
    //   const result = await fetchFile(page, pageSize);
    //   if (result.success) {
    //     setFiles(result.data);
    //   }
    // } catch (error) {
    //   console.error("Terjadi kesalahan:", error);
    // } finally {
    // }
  };

  useEffect(() => {
    fetchFiles(page, search);

    // Update URL tanpa navigasi ulang
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("search", search.toString());
    window.history.replaceState({}, "", url.toString());
  }, [page, search]);
  

  useEffect(() => {
    if (items.length > 0) {
      // Filter untuk menghindari duplikasi data berdasarkan id
      const uniqueFiles = items.filter(
        (newFile) => !files.some((file) => file.fileid === newFile.fileid)
      );
      setFiles((prevFiles) => [...uniqueFiles, ...prevFiles]);
    }
  }, [items]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const truncateString = (str: string, maxLength: number) => {
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };

  const clickViewDetail = (file: string) => {
    redirect(`/files/${file}?page=${page}`);
  };

  function handleSearch(term: string) {
    console.log(term);
    setSearch(term)
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

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
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
      </CardContent>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>Page {page}</PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
}
