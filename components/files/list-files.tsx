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

    if (items.length > 0) {
      // Filter untuk menghindari duplikasi data berdasarkan id
      // const uniqueFiles = contextFiles.filter(
      //   (newFile) => !files.some((file) => file.id === newFile.id)
      // );
      // setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
      fetchProducts(1);  
    }
    //fetchProducts(1);  
  }, [items]);
  
 
  return (
    <Card className="pb-4">
      <CardHeader>
        <CardTitle>Table files</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 h-auto">
      <div>
      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.filename}
            </li>
          ))}
        </ul>
      )}
    </div>

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
                      <AvatarImage src={file.url ? file.url : "/"} alt="@shadcn"/> 
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
