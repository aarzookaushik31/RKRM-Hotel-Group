import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hotel from "./pages/Hotel/index.js";
import RootLayout from "./pages/RootLayout/index.js";
import DemoPage from "./pages/Demopage/index";
import Error from "./pages/ErrorPage/index";
import Users from "./pages/users/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: "true", element: <Hotel /> },
      { path: "/users", element: <Users /> },
      { path: "/demo", element: <DemoPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
