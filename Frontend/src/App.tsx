import { Login } from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Sign up/Signup";
import { Feed } from "./pages/Feed/Feed";
import { usePanelsStore } from "./store/usePanelsStore";
import { ViewStoryOrVisitProfilePanel } from "./panels/ViewStoryOrVisitProfilePanel/ViewStoryOrVisitProfilePanel";
import { BlackBackground } from "./assets/BlackBackground";
import { DisplayMDup } from "./assets/MD breakpoint/DisplayMDup";
import { DisplayBelowMD } from "./assets/MD breakpoint/DisplayBelowMD";
import "./global.css";
import styles from "./app.module.css";
import { MDUpNavBar } from "./components/Navbars/SideNavbar/SideNavbar";

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
  // Navbars zIndex: 2
  // panels zIndex: 3
  return (
    <>
      <DisplayMDup>
        <MDUpNavBar />
        <div className={styles.MDUpOutlet}>
          <RouterProvider router={router} />
        </div>
      </DisplayMDup>

      <DisplayBelowMD>
        <div className={styles.belowMDOutlet}>
          <RouterProvider router={router} />
        </div>
      </DisplayBelowMD>

      {blackBackground && <BlackBackground />}
      {viewStoryOrVisitProfilePanel.display && <ViewStoryOrVisitProfilePanel />}
    </>
  );
}

export default App;
