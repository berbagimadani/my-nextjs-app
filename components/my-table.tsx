"use client"

// import {
//   Table,
//   TableBody, 
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

// interface Product {
//   id: number;
//   name: string; 
// }

// export const revalidate = 3600 

// export async function MyTable() {
 
//   const data = await fetch('https://microsoftedge.github.io/Demos/json-dummy-data/1MB.json')
//   const posts: Product[] = await data.json()
//   return (
//     <main>
//       <h1>Blog Posts</h1>
//       <ul>
//         {posts.map((post, index) => (
//           <li key={index}>{post.name} # {index}</li>
//         ))}
//       </ul>
//     </main>
//   )
// }


// app/page/your-page.js
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string; 
}


export function MyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const products: Product[] = data;
  return (
    <div>
      {products.map((item) => (
        <div key={item.id}>{item.id}#{item.title}</div>
      ))}
    </div>
  );
} 