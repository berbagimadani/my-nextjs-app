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

interface Product {
  id: number;
  filename: string;
  url: string;
  fileid: string;
}

export function ListFiles() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const { items } = useDataContext();

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFile(page);
      if (result.success) { 
        setProducts(result.data);
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
              {item.name}
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
              {products.map((product) => (
                <TableRow key={product.id}> 
                  <TableCell>
                  <Avatar> 
                      <AvatarImage src={product.url ? product.url : "/"} alt="@shadcn"/> 
                      <AvatarFallback className="rounded-none">
                        Fallback Image
                      </AvatarFallback> 
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.filename}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        
      </CardContent>
 
    </Card>
  );
}
