"use client";
import { logout } from "@/app/auth/login/auth";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

interface AdminDropdownProps {
  username: string;
}

interface DropdownControllerProps {
  handleToggle: () => void;
  isOpen: boolean;
  label: string;
}


export function AdminDropdown({ username }: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <DropdownController
        handleToggle={handleToggle}
        isOpen={isOpen}
        label={`Hello, ${username}`}
      />
      {isOpen && <DropdownMenu />}
    </div>
  );
}

function DropdownController({
  handleToggle,
  isOpen,
  label,
}: DropdownControllerProps) {
  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      {label}
      <ChevronDownIcon
        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function DropdownMenu() {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
      <AddProduct />
      <Logout />
    </div>
  );
}

function DropdownItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
      {children}
    </div>
  );
}

function AddProduct() {
  return (
    <DropdownItem>
      <Link href="/products/new">Add Product</Link>
    </DropdownItem>
  );
}

function Logout() {
  return (
    <DropdownItem>
      <button onClick={logout}>Logout</button>
    </DropdownItem>
  );
}
