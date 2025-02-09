"use client";

import { LogOut } from "lucide-react"; // Usando Lucide para el ícono de logout
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";
import { SidebarTrigger } from "../ui/sidebar";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="p-4 w-full flex items-center justify-between ml-auto">
      <SidebarTrigger />
      <h1 className="text-xl ml-2 font-bold dark:text-white">Mecanica 2T</h1>

      <div className="flex items-center space-x-4 ml-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <LogOut className="text-gray-800 dark:text-white" />
        </button>

        <ThemeSwitcher />
      </div>
    </nav>
  );
}
