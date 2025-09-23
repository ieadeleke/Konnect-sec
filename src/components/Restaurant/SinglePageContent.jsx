import React from "react";
import { CheckoutSide } from "./CheckoutSide";
import { ImageTray } from "./ImageTray";

export const SinglePageContent = (props) => {
  return (
    <div className="flex justify-center h-full gap-4 px-4 md:px-0">
      <div className="w-full md:w-[91.666667%] xl:w-2/3">
        <ImageTray isOpen={props?.isOpen} />
      </div>
      <div className="hidden md:flex md:w-[91.666667%] xl:w-1/3">
        <CheckoutSide />
      </div>
    </div>
  );
};
