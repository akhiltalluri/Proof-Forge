import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Proof Forge — Mathematical Proof-Writing Assistant",
  description:
    "A personal project for turning rough mathematical proof sketches into clearer, more structured arguments with proof typing, heuristic verification, and revision support.",
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
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap"
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
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_22%)] dark:[background:radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_20%)]" />
            <NavBar />
            <div className="relative flex-1 flex flex-col">{children}</div>
            <footer className="relative border-t border-zinc-200/70 py-6 dark:border-zinc-800/50">
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
