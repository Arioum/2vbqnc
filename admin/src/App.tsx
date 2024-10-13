import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import DashBoard from "./pages/DashBoard";
import AllUsers from "./pages/AllUsers";
import Sales from "./pages/Sales";
import AllListings from "./pages/AllListings";
import Bookings from "./pages/Bookings";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {/* <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        /> */}

        {isLoggedIn && (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashBoard />
                </Layout>
              }
            />
            <Route
              path="/all-users"
              element={
                <Layout>
                  <AllUsers />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/all-listings"
              element={
                <Layout>
                  <AllListings />
                </Layout>
              }
            />
            <Route
              path="/bookings"
              element={
                <Layout>
                  <Bookings />
                </Layout>
              }
            />
            <Route
              path="/sales"
              element={
                <Layout>
                  <Sales />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
};

export default App;
