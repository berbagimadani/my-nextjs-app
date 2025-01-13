// /app/components/Sidebar.tsx
import { FC } from 'react';
import Link from 'next/link'
import { Button } from "@/components/ui/button" 

const Sidebar: FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-5 text-lg font-semibold">Sidebar</div>
      <ul>
        <li className="p-4"><Link className="p-4 hover:bg-gray-700" href="/">Home</Link></li>
        <li className="p-4"><Link className="p-4 hover:bg-gray-700" href="/about">About</Link></li>
        <li className="p-4"><Link className="p-4 hover:bg-gray-700" href="/services">Services</Link></li>
      </ul>
      <Button>Click me</Button>
    </div>
  );
};

export default Sidebar;
