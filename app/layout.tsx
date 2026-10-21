import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وَفْر | سوق واحد، خيارات بلا حدود",
  description:
    "وَفْر سوق إلكتروني يجمع المنتجات والخدمات في تجربة تسوق واحدة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
