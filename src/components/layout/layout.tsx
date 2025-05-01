
import { Outlet } from "react-router-dom";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { useState } from "react";

export const Layout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarExpansion = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar 
        expanded={sidebarExpanded} 
        open={sidebarOpen} 
        onToggle={toggleSidebar}
        onExpand={toggleSidebarExpansion}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
