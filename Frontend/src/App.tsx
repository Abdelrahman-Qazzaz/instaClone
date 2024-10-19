import { Login } from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Signup } from "./pages/Sign up/Signup";
import { Feed } from "./pages/Feed/Feed";
import { usePanelsStore } from "./store/usePanelsStore";
import { ViewStoryOrVisitProfilePanel } from "./panels/ViewStoryOrVisitProfilePanel/ViewStoryOrVisitProfilePanel";
import { BlackBackground } from "./assets/BlackBackground";
import { DisplayMDup } from "./assets/MD breakpoint/DisplayMDup";
import { DisplayBelowMD } from "./assets/MD breakpoint/DisplayBelowMD";
import "./global.css";
import styles from "./app.module.css";
import { SideNavbar } from "./components/Navbars/SideNavbar/SideNavbar";
import { BottomNavBar } from "@/components/Navbars/BottomNavbar/BottomNavbar";
import { TopNavBar } from "@/components/Navbars/TopNavbar/TopNavbar";

function App() {
  const { viewStoryOrVisitProfilePanel } = usePanelsStore((store) => store);
  const blackBackground = viewStoryOrVisitProfilePanel.display; // | anotherPanel.display

  // BlackBackground zIndex: 0
  // FixedPosPage zIndex: 1
  // Navbars zIndex: 2
  // panels zIndex: 3
  return (
    <>
      <Router>
        <DisplayMDup>
          <SideNavbar />
        </DisplayMDup>
        <DisplayBelowMD>
          <TopNavBar />
          <BottomNavBar />
        </DisplayBelowMD>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </Router>

      {blackBackground && <BlackBackground />}
      {viewStoryOrVisitProfilePanel.display && <ViewStoryOrVisitProfilePanel />}
    </>
  );
}
/*
   <>
      <DisplayMDup>
        <div className={styles.MDUpOutlet}>
          <Router>
          <MDUpNavBar />
          <Switch>
            <Route/>
          </Switch>
          </Router>

        </div>
      </DisplayMDup>

      <DisplayBelowMD>
        <div className={styles.belowMDOutlet}>
          <Router></Router>
        </div>
      </DisplayBelowMD>

      {blackBackground && <BlackBackground />}
      {viewStoryOrVisitProfilePanel.display && <ViewStoryOrVisitProfilePanel />}
    </>
*/
export default App;
