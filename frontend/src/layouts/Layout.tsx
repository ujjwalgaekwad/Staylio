import Footer from "@/components/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="">{children}</main>
      <Footer isPrimary={false} />
    </div>
  );
}

export default Layout;
