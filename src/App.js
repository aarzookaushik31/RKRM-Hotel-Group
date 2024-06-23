import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hotel from "./pages/Hotel/index.js";
import RootLayout from "./pages/RootLayout/index.js";
import DemoPage from "./pages/Demopage/index";
import Error from "./pages/ErrorPage/index";
import Login from "./pages/Login/index";
import Users from "./pages/UsersPage/index";
import Membership from "./pages/Membership/index";
import Vouchers from "./pages/Vouchers/index";
import PrivateRoute from "./components/privateRoute/index";
import UserDetails from "./pages/UserDetails/index";
import { AuthProvider } from "./context/AuthContext.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <PrivateRoute element={<Hotel />} /> },
      { path: "/users", element: <PrivateRoute element={<Users />} /> },
      {
        path: "/users/:userId",
        element: <PrivateRoute element={<UserDetails />} />,
      },
      {
        path: "/membership",
        element: <PrivateRoute element={<Membership />} />,
      },
      { path: "/vouchers", element: <PrivateRoute element={<Vouchers />} /> },
      { path: "/demo", element: <PrivateRoute element={<DemoPage />} /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
