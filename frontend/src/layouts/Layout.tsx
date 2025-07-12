import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
