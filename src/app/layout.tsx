import { StateProvider } from "@/shared/StateProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O-store",
  description: "магазин, где можно купить все",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
