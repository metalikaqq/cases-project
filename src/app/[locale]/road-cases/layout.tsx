import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "./page.module.scss";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <div className={s.page__wrapper}>
      <Header />

      {children}

      <Footer />
    </div>
  );
}
