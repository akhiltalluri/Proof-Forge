import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Proof Forge — Proof-writing assistant",
  description:
    "Personal project: turn rough mathematical proof sketches into clearer, structured arguments — with steps, heuristic verification, and archive history.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('proof-forge-theme') || 'system';
                  var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', dark);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <div className="flex-1 flex flex-col">{children}</div>
            <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800/50">
              <div className="mx-auto max-w-7xl px-6">
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
                  Proof Forge provides structural assistance and heuristic
                  verification, not formal proof checking. Always verify results
                  independently.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
