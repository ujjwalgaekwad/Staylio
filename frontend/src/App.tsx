import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/SignIn";
import Home from "./pages/Home";
import AddHotels from "./pages/AddHotels";
import NotFound from "./pages/NotFound";
import Hotels from "./pages/Hotels";
import EditHotel from "./pages/EditHotel";
import SearchData from "./pages/SearchData";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import BookingData from "./pages/BookingData";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {isLoggedIn ? (
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
              path="*"
              element={
                <Layout>
                  <NotFound />
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
            <Route
              path="/detail/:hotelId"
              element={
                <Layout>
                  <Details />
                </Layout>
              }
            />
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <BookingData />
                </Layout>
              }
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
