import { ReactNode } from "react";
import styles from "./Dropdown.module.css";
import { ChevronDown } from "@/icons/icon.Chevron";
export const Dropdown = ({
  showChildren,
  setShowChildren,
  children,
  buttonText,
}: {
  showChildren: boolean;
  setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  buttonText: string;
}) => {
  return (
    <div style={{ border: "2px solid red" }}>
      <button
        className={styles.button}
        onClick={() => {
          setShowChildren((prev) => !prev);
        }}
      >
        {buttonText}
        <div>
          <ChevronDown fontSize={"1rem"} />
        </div>
      </button>
      {showChildren && children}
    </div>
  );
};

/*
 .additionalSettings button {
  background-color: transparent !important;
  border: 1px solid var(--primary-border-color) !important;
}
 */
