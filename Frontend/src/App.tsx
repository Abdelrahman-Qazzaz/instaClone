import { Login } from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Sign up/Signup";
import { Feed } from "./pages/Feed/Feed";
import { usePanelsStore } from "./store";
import { ViewStoryOrVisitProfilePanel } from "./panels/ViewStoryOrVisitProfilePanel/ViewStoryOrVisitProfilePanel";
import { BlackBackground } from "./assets/BlackBackground";

function App() {
  const { viewStoryOrVisitProfilePanel } = usePanelsStore((store) => store);
  const blackBackground = viewStoryOrVisitProfilePanel.display; // | anotherPanel.display

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

  // BlackBackground zIndex: 0
  // FixedPosPage zIndex: 1
  return (
    <>
      <RouterProvider router={router} />

      {blackBackground && <BlackBackground />}
      {viewStoryOrVisitProfilePanel.display && <ViewStoryOrVisitProfilePanel />}
    </>
  );
}

export default App;
