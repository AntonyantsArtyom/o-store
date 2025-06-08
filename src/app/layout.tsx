import { StateProvider } from "@/app/StateProvider";
import { SiteMenuWrapper } from "@/widgets/SiteMenuWrapper";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
        <AntdRegistry>
          <StateProvider>
            <SiteMenuWrapper>{children}</SiteMenuWrapper>
          </StateProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
