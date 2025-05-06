import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import AddHotels from "./pages/AddHotels";
import NotFound from "./pages/NotFound";
import Hotels from "./pages/Hotels";
import EditHotel from "./pages/EditHotel";
import SearchData from "./pages/SearchData";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterForm />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginForm />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotels"
              element={
                <Layout>
                  <AddHotels />
                </Layout>
              }
            />
            <Route
              path="/hotels"
              element={
                <Layout>
                  <Hotels />
                </Layout>
              }
            />
            <Route
              path="/view-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchData />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
