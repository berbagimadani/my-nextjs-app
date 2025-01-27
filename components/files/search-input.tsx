"use client";
  
import { redirect } from "next/navigation";
import { SidebarInput } from "../ui/sidebar";


const SearchInput = () => { 
  
    const handleSearch = (option: string) => { 
    redirect(`/files?search=${option}`);
  };

  return (
    <SidebarInput
        id="search"
        placeholder="Search the docs..."
        onChange={(e) => {
            handleSearch(e.target.value);
        }}
        className="pl-8 bg-content"
    />
  );
};

export default SearchInput;
