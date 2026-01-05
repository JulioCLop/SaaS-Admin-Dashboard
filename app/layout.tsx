import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS Admin Dashboard",
  description: "A modern SaaS admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#070A12", color: "white" }}>{children}</body>
    </html>
  );
}
