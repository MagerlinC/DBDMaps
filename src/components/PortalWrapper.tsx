import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type PortalWrapperProps = {
  children: ReactNode;
};
const PortalWrapper: React.FC<PortalWrapperProps> = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};
export default PortalWrapper;
