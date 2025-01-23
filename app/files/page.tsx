"use client";

import { ListFiles } from "@/components/files/list-files"; 
import Layout from "../components/layout";
import CreateFile from "@/components/files/create-files";
import { DataProvider } from "@/context/DataContext";

export default function Page() {
  return (
    <DataProvider>
      <Layout>
      <div className="flex gap-4">
        <div className="w-2/6">
          <CreateFile></CreateFile>
        </div>
        <div className="w-full">
          <ListFiles></ListFiles>
        </div>
       </div>
      </Layout>
    </DataProvider>
  );
}