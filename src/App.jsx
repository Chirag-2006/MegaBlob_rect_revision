import { useEffect, useState } from "react";
// import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/auth/authSlice";
import authService from "./appwrite/auth";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  // const { status: authStatus, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          // console.log("userData in app.jsx", userData);
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(toast.success("hello"))

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />{" "}
          </main>
          <Footer />
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
