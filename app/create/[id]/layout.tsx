import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb Clone - Create",
};

type Props = {
  children: React.ReactNode;
};

const LayoutCreation: React.FC<Props> = ({ children }) => {
  return <div className="mt-10">{children}</div>;
};

export default LayoutCreation;
