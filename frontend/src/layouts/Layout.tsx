import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavigationBar/>
      <main>{children}</main>
      <Footer isPrimary={false} />
    </div>
  );
}

export default Layout;
