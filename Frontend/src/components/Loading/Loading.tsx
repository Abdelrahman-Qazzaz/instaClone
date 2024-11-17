import { BlackBackground } from "@/assets/BlackBackground";
import spinner from "../../../public/spinner.svg";

export const Loading = () => {
  return (
    <div
      style={{
        backgroundColor: "",
        zIndex: 999,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BlackBackground />
      <img src={spinner} width="4%" alt="" />
    </div>
  );
};
