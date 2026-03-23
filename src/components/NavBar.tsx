"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/forge", label: "Forge" },
  { href: "/library", label: "Library" },
  { href: "/archive", label: "Archive" },
  { href: "/settings", label: "Settings" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/forge" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Proof Forge
          </span>
          <span className="hidden sm:inline text-xs text-zinc-400 dark:text-zinc-600">
            by Akhil Talluri
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
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
