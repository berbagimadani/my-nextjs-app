import Layout from "../components/layout";
import CreateFile from "@/components/files/create-files";
import { ListFiles } from "@/components/files/list-files";
// import { ListFilesCSR } from "@/components/files/list-filesCSR";
import { DataProvider } from "@/context/DataContext"; 
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) { 

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const search = resolvedParams.search || "";
  return (
    <DataProvider>
      <Layout>
      <div className="flex gap-4">
        <div className="w-2/6">
          <CreateFile></CreateFile>
        </div>
        <div className="w-full">
          <Suspense fallback={<p>Loading...</p>}>
            <ListFiles page={page} search={search}></ListFiles>
          </Suspense>
          {/* <ListFilesCSR></ListFilesCSR> */}
        </div>
       </div>
      </Layout>
    </DataProvider>
  );
}


// import Image from "next/image"; 
// // import { fetchFile } from "@/lib/actions/fetchfile";  
// import {
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarInput, 
// } from "@/components/ui/sidebar";
// import { Search } from "lucide-react";  
// import { Label } from "@/components/ui/label";
// import { Suspense } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// async function Posts({
//   page,
//   search,
// }: {
//   page: number;
//   search: string;
// }) { 
//   const response = await fetch(`http://localhost:3000/api/files/getAll?page=${page}&search=${search}`, {
//       next: { revalidate: 60 }
//     });
  
//   const files = await response.json();

//   const truncateString = (str: string, maxLength: number) => {
//     return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
//   }; 
 

//   return (
//     <Card className="pb-4">
//       <CardHeader>
//         <CardTitle>Table files</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 h-auto">
//         <div className="flex pb-4">
//           <SidebarGroup className="py-0">
//             <SidebarGroupContent className="relative">
//               <Label htmlFor="search" className="sr-only">
//                 Search
//               </Label>
//               <SidebarInput
//                 id="search"
//                 placeholder="Search the docs..." 
//                 className="pl-8 bg-content"
//               />
//               <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div> 
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//           {files.map((file: any) => (
//             <div
//               key={file.id}
//               className="flex flex-col items-center space-y-2 p-4 border rounded-md shadow-sm relative"
//             >
//               {/* Avatar dengan gambar */}
//               <div className="relative w-24 h-24 rounded-md overflow-hidden">
//                 <Image
//                   src={file.url || "/fallback-image.png"}
//                   alt={file.filename || "Fallback"}
//                   width={200}
//                   height={100}
//                   style={{
//                     objectFit: "cover",
//                   }}
//                   priority={true}
//                 />
//               </div>
//               {/* Teks nama file */}
//               <p className="text-center text-sm font-medium break-words max-w-full">
//                 {truncateString(file.filename, 20)}
//               </p>

//               <div className="absolute right-5 -top-2">
                 
//               </div>
//             </div>
//           ))}
//         </div> 
//          {/* Pagination Links */}
//       <div>
//         <a href={`?page=${Math.max(page - 1, 1)}&search=${encodeURIComponent(search)}`}>
//           Previous
//         </a>
//         <a href={`?page=${page + 1}&search=${encodeURIComponent(search)}`}>
//           Next
//         </a>
//       </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: { page?: string; search?: string };
// }) { 

//   const resolvedParams = await searchParams;
//   const page = parseInt(resolvedParams.page || "1", 10);
//   const search = resolvedParams.search || "";

//   return (
//     <div>
//       <h1>Posts </h1>
//       <Suspense fallback={<p>Loading...</p>}>
//         <Posts page={page} search={search}/>
//       </Suspense>
//     </div>
//   );
// }