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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; 
import { fetchFile } from "@/lib/actions/fetchfile";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"; 
import { useDataContext } from "@/context/DataContext";

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

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFile(page);
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
    fetchProducts(1);  
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      // Filter untuk menghindari duplikasi data berdasarkan id
      const uniqueFiles = items.filter(
        (newFile) => !files.some((file) => file.fileid === newFile.fileid)
      );
      setFiles((prevFiles) => [...uniqueFiles, ...prevFiles]);   
    } 
  }, [items]);
  
 
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
                  <Avatar> 
                      <AvatarImage src={file.url ? file.url : "/"} alt="@shadcn" className="w-20"/> 
                      <AvatarFallback className="rounded-none">
                        Fallback Image
                      </AvatarFallback> 
                    </Avatar>
                  </TableCell>
                  <TableCell>{file.filename}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        
      </CardContent>
 
    </Card>
  );
}
