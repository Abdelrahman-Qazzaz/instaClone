import { I_IconProps } from "@/icons/I_iconProps";

export const LeftArrowIcon: React.FC<I_IconProps> = ({ fontSize, color }) => {
  return <i style={{ fontSize, color }} className="bi bi-arrow-left"></i>;
};

export const RightArrowIcon: React.FC<I_IconProps> = ({ fontSize, color }) => {
  return <i style={{ fontSize, color }} className="bi bi-arrow-right"></i>;
};

export const LeftArrowCircleFillIcon: React.FC<I_IconProps> = ({
  fontSize,
  color,
}) => {
  return (
    <i style={{ fontSize, color }} className="bi bi-arrow-left-circle-fill"></i>
  );
};

export const RightArrowCircleFillIcon: React.FC<I_IconProps> = ({
  fontSize,
  color,
}) => {
  return (
    <i
      style={{ fontSize, color }}
      className="bi bi-arrow-right-circle-fill"
    ></i>
  );
};
