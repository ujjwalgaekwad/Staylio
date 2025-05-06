import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="">{children}</main>
      <Footer isPrimary={false} />
    </div>
  );
}

export default Layout;
