import React from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutCreation: React.FC<Props> = ({ children }) => {
  return <div className="mt-10">{children}</div>;
};

export default LayoutCreation;
