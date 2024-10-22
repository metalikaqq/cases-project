// import { Inter } from "next/font/google";
import s from './page.module.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

// const inter = Inter({ subsets: ["latin"] });
// className={inter.className}

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
