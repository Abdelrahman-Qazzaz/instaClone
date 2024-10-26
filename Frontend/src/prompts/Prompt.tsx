import React from "react";
import { Button } from "react-bootstrap";

import { usePromptsStore } from "@/store/usePromptsStore";
import styles from "./Prompt.module.css";

export type ButtonsProps = { text: string; onClick: React.MouseEventHandler }[];
export const Prompt = ({ buttonsProps }: { buttonsProps: ButtonsProps }) => {
  const promptsStore = usePromptsStore((state) => state);
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 3,
      }}
    >
      <div
        style={{ width: "350px" }}
        className={`${styles.container} rounded shadow`}
      >
        <div>
          {buttonsProps.map((buttonProps, index) => (
            <Button
              key={index}
              className={`${styles.button} text-center bg-transparent w-100 text-start `}
              onClick={buttonProps.onClick}
            >
              {buttonProps.text}
            </Button>
          ))}
          <Button
            className={`${styles.button} text-center bg-transparent w-100 text-start`}
            onClick={promptsStore.closeAll}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
