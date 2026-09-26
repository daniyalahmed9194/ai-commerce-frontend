import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { History, Sparkles } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Image Studio",
  description: "Generate boutique product images and captions."
};

export const viewport: Viewport = {
  themeColor: "#566b4c",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-black/10 bg-paper/95">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Sparkles size={20} />
              Product Image Studio
            </Link>
            <nav className="flex items-center gap-2">
              <Link className="btn btn-secondary" href="/history">
                <History size={16} />
                History
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
