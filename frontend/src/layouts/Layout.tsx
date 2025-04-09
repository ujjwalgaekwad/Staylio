import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>
      <Header/>
      <main>
        {<Outlet />}
      </main>
      <Footer isPrimary={false}/>
    </div>
  )
}

export default Layout
