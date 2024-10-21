import { ReactNode } from "react";

export const DisplayXLUp = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={style} className="d-none d-xl-block">
      {children}
    </div>
  );
};
