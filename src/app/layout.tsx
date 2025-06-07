import { StateProvider } from "@/shared/StateProvider";
import { SiteMenuWrapper } from "@/widgets/SiteMenuWrapper";
import type { Metadata } from "next";
import "./styles.scss";

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
        <SiteMenuWrapper>
          <StateProvider>{children}</StateProvider>
        </SiteMenuWrapper>
      </body>
    </html>
  );
}
