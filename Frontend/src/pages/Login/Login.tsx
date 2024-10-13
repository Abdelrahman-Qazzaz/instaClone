import { FixedPosPage } from "../../assets/FixedPosPage";
import { LoginCarousel } from "./components/LoginCarousel/LoginCarousel";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { DisplayMDup } from "../../assets/DisplayMDup";
import { Iphone } from "../../components/Iphone";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <FixedPosPage center={true}>
      <div className="d-flex align-items-center gap-5">
        <DisplayMDup>
          <Iphone>
            <LoginCarousel />
          </Iphone>
        </DisplayMDup>
        <LoginForm />
      </div>
    </FixedPosPage>
  );
};
