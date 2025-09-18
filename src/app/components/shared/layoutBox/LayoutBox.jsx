import React from "react";

const LayoutBox = ({
  w = "container",
  h = "h-auto",
  py = "py-12",
  children,
}) => {
  return <section className={`${w} ${h} ${py} mx-auto `}>{children}</section>;
};

export default LayoutBox;
