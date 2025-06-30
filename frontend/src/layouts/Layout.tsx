import Footer from "@/components/Footer";
import Navs from "@/components/Navs";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navs/>
      <main>{children}</main>
      <Footer isPrimary={false} />
    </div>
  );
}

export default Layout;
