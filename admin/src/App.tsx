import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";

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
        <Route
          path="/dashboard"
          element={
            <Layout>
              <MyHotels />
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
                  <MyHotels />
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
