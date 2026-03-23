import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proof Forge — Polish Your Proofs",
  description:
    "A personal tool that turns rough math proof sketches into structured, rigorous proofs with step-by-step reasoning and justification checks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
