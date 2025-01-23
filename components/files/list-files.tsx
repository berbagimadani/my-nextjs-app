"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { fetchFile } from "@/lib/actions/fetchfile";
import { useDataContext } from "@/context/DataContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { SidebarMenuButton } from "../ui/sidebar";
import { ChevronsUpDown, Trash, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { redirect } from 'next/navigation'

interface File {
  id: number;
  filename: string;
  url: string;
  fileid: string;
}

export function ListFiles() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items } = useDataContext();
  const [page, setPage] = useState(1);

  const fetchProducts = async (page: number) => {
    const pageSize = 12;
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFile(page, pageSize);
      if (result.success) {
        setFiles(result.data);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

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
    redirect(`/files/${file}`)
  };

  return (
    <Card className="pb-4">
      <CardHeader>
        <CardTitle>Table files</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 h-auto">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div></div>
        )}
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
                  layout="fill"
                  objectFit="cover"
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
                      <DropdownMenuItem className="cursor-pointer"
                        onSelect={() => { clickViewDetail(file.fileid) }}
                      >
                        <View/>View
                      </DropdownMenuItem> 
                      <DropdownMenuItem className="cursor-pointer"
                        onSelect={() => {}}
                      >
                        <Trash/>Delete
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
            <PaginationLink href="#">Page {page}</PaginationLink>
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
