import { Login } from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Sign up/Signup";
import { Feed } from "./pages/Feed/Feed";
import { usePromptsStore } from "@/store/usePromptsStore";
import { ViewStoryOrVisitProfilePrompt } from "@/prompts/ViewStoryOrVisitProfilePrompt/prompt.ViewStoryOrVisitProfile";
import { BlackBackground } from "./assets/BlackBackground";
import { DisplayMDup } from "./assets/MD breakpoint/DisplayMDup";
import { DisplayBelowMD } from "./assets/MD breakpoint/DisplayBelowMD";
import "./global.css";

import { SideNavbar } from "./components/Navbars/SideNavbar/SideNavbar";

import { TopNavBar } from "@/components/Navbars/Vertical Navbars/VerticalNavbars";
import { BottomNavBar } from "@/components/Navbars/Vertical Navbars/VerticalNavbars";
import { CreatePostPanel } from "@/panels/CreatePostPanel/panel.CreatePost";
import { usePanelsStore } from "@/store/usePanelsStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { Loading } from "@/components/Loading/Loading";

function App() {
  const { viewStoryOrVisitProfilePrompt } = usePromptsStore((store) => store);
  const { createPostPanel } = usePanelsStore((store) => store);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const blackBackground =
    viewStoryOrVisitProfilePrompt.display || createPostPanel.display;

  // FixedPosPage zIndex: 1
  // Navbars zIndex: 2
  // BlackBackground zIndex: 2
  // prompts & Panels' zIndex: 3
  // Loading zIndex: 4
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

        {blackBackground && <BlackBackground />}

        {viewStoryOrVisitProfilePrompt.display && (
          <ViewStoryOrVisitProfilePrompt />
        )}
        {createPostPanel.display && <CreatePostPanel />}

        {isLoading && <Loading />}
      </Router>
    </>
  );
}

export default App;
