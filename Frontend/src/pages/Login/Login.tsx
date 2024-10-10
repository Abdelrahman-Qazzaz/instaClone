import { FixedPosPage } from "../../assets/FixedPosPage";
import { LoginCarousel } from "./components/LoginCarousel/LoginCarousel";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { DisplayMDup } from "../../assets/DisplayMDup";

export const Login = () => {
  return (
    <FixedPosPage>
      <div className="d-flex align-items-center gap-5">
        <DisplayMDup>
          <LoginCarousel />
        </DisplayMDup>

        <LoginForm />
      </div>
    </FixedPosPage>
  );
};
