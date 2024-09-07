import s from "./page.module.scss";

interface RootLayoutProps {
  children: React.ReactNode;
}

// className={inter.className}
// import { Inter } from "next/font/google";

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <div>
      <div className={s.page__wrapper}>
        {/* <Header /> */}

        {children}

        {/* <Footer /> */}
      </div>
    </div>
  );
}
