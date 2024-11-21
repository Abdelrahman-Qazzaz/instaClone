import { useState } from "react";
import styles from "./ToggleButton.module.css";
import Switch from "react-switch"; // Import Switch from react-switch

export const ToggleButton = ({
  text,
  value,
  setValue,
}: {
  text: string;
  value: boolean;
  setValue: (arg0: boolean) => void;
}) => {
  function toggleValue() {
    setValue(!value);
  }

  return (
    <div className="d-flex justify-content-between gap-2 text p-2">
      {text}
      <Switch
        checked={value}
        onChange={toggleValue}
        height={24}
        width={48}
        onColor="#80C4E9"
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </div>
  );
};
