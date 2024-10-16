import React from "react";
import { FixedPosPage } from "../assets/FixedPosPage";
import { Button } from "react-bootstrap";
import { XIcon } from "../icons/XIcon";
import { usePanelsStore } from "../store";

export type ButtonsProps = { text: string; onClick: React.MouseEventHandler }[];
export const Panel = ({ buttonsProps }: { buttonsProps: ButtonsProps }) => {
  const panelsStore = usePanelsStore((state) => state);
  return (
    <FixedPosPage center={true}>
      <div
        style={{ width: "350px" }}
        className="border bg-white pb-3 rounded shadow"
      >
        <div className="d-flex justify-content-end">
          <Button
            onClick={panelsStore.closeAll}
            className="bg-transparent border-0 text-dark p-2"
            style={{ width: "fit-content" }}
          >
            <XIcon width="1.5rem" />
          </Button>
        </div>

        <div className="mt-3">
          {buttonsProps.map((buttonProps, index) => (
            <Button
              key={index}
              className="text-center bg-transparent border-0 text-dark w-100 text-start mb-2"
              onClick={buttonProps.onClick}
            >
              {buttonProps.text}
            </Button>
          ))}
        </div>
      </div>
    </FixedPosPage>
  );
};
