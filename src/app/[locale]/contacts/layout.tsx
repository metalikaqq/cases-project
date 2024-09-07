import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "./page.module.scss";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
// className={inter.className}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <div>
      <div className={s.page__wrapper}>{children}</div>
    </div>
  );
}
