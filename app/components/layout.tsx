// /app/components/Layout.tsx
import { FC } from 'react';
import Header from './header';
import Sidebar from './sidebar';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
