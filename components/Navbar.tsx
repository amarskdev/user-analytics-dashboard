"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Sessions",
      href: "/sessions",
    },
    {
      label: "Heatmap",
      href: "/heatmap",
    },
  ];

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl text-gray-900 font-bold">
          Analytics Dashboard
        </Link>

        <div className="flex gap-4">
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition text-gray-700 hover:bg-gray-500 hover:text-white
                    }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
