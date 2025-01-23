"use client";

import { ListFiles } from "@/components/files/list-files"; 
import Layout from "../components/layout";
import CreateFile from "@/components/files/create-files";
import { DataProvider } from "@/context/DataContext";

export default function Page() {
  return (
    <DataProvider>
      <Layout>
      <div className="flex gap-2">
        <CreateFile></CreateFile>
        <ListFiles></ListFiles>
       </div>
      </Layout>
    </DataProvider>
  );
}