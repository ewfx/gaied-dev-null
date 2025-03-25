import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev/null",
  description: "Gen AI Orchestrator: Smart Email & Document Triage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
