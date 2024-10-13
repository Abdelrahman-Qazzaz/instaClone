import { Login } from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Sign up/Signup";
import { Feed } from "./pages/Feed/Feed";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: /*logged in ?*/ <Feed /> /*: <Login/>*/,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
