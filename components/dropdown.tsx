"use client";
 
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { View } from "lucide-react";
import { redirect } from "next/navigation";

interface DropdownProps {
  options: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => { 
  const handleSelect = (option: string) => { 
    redirect(`/files/${option}`);
  };

  return (
    <div className="dropdown">
      <DropdownMenuItem
        className="cursor-pointer"
        key="view"
        onClick={() => handleSelect(options)}
      >
        <View />
        View
      </DropdownMenuItem>
    </div>
  );
};

export default Dropdown;
