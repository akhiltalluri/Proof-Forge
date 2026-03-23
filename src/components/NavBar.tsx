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
    <nav className="relative border-b border-zinc-200/70 bg-white/55 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/55">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/forge" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-sm font-bold text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100">
            PF
          </span>
          <span className="display-font text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Proof Forge
          </span>
          <span className="hidden sm:inline text-xs text-zinc-400 dark:text-zinc-600">
            by Akhil Talluri
          </span>
        </Link>
        <div className="surface-panel flex items-center gap-1 rounded-full px-1.5 py-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                    : "text-zinc-500 hover:bg-white/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/70 dark:hover:text-zinc-100"
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
