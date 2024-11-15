import { I_IconProps } from "@/icons/I_iconProps";

export const CropIcon: React.FC<I_IconProps> = ({ fontSize, color }) => {
  return <i style={{ fontSize, color }} className="bi bi-crop"></i>;
};
