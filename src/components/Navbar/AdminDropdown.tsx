'use client'
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

interface AdminDropdownProps {
  username: string;
}

export function AdminDropdown({ username }: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

return (
    <div className="relative inline-block text-left">
      {/* Dropdown trigger button */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        Hello, {username}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          <Link
            href="/products/new"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Add Product
          </Link>
        </div>
      )}
    </div>
  );
}