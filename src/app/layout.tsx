import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capitalkey Realtors | Rent, Buy & Sell Property",
  description:
    "Find properties to rent or buy, or submit your property for sale with Capitalkey Realtors.",
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