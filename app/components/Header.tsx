"use client";

import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

export default function Header() {
  const { setOpen } = useContext(SidebarContext);

  return (
    <header className="bg-gray-800 text-white h-14 px-4 flex items-center fixed top-0 left-0 w-full z-40">
      
      {/* ☰ Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden mr-4 bg-gray-900 p-2 rounded shadow"
      >
        ☰
      </button>

      <h1 className="text-xl font-bold">Sales Company</h1>
    </header>
  );
}
