import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O-store",
  description: "магазин, где можно купить все",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
