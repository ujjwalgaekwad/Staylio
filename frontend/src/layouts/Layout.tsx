import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* <Hero/> */}
      <main className="mx-auto px-10">{children}</main>
      <Footer isPrimary={false} />
    </div>
  );
}

export default Layout;
