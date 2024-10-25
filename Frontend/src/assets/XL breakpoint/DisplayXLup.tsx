import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

export const DisplayXLUp = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  const XLup = useMediaQuery({ minWidth: 1200 });
  return XLup && <div style={style}>{children}</div>;
};
