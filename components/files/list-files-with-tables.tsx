"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { fetchFile } from "@/lib/actions/fetchfile";
import { useDataContext } from "@/context/DataContext";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

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
    const pageSize = 10
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Filename</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  {/* Avatar dengan Next.js Image */}
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image
                      src={file.url || "/fallback-image.png"} // URL gambar atau fallback
                      alt={file.filename || "Fallback"}
                      layout="fill" // Mengisi area container
                      objectFit="cover" // Agar gambar tidak terdistorsi
                    />
                  </div>
                </TableCell>
                <TableCell className="break-words max-w-xs">
                  {/* Teks bisa wrap */}
                  {file.filename}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              Page {page}
            </PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext onClick={handleNext}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
}
