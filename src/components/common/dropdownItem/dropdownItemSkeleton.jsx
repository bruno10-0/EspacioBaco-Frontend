import React from "react";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";

export const DropdownItemSkeleton = () => {
  return (
    <div>
      <div
        style={{ height: "120px" }}
        className="w-full flex items-center justify-center mb-4"
      >
        <div
          className=" relative md:bg-accent rounded-full"
          style={{ width: "100px", height: "80px" }}
        >
          <div className="skeleton w-full h-full rounded-full shrink-0"></div>
        </div>
        <div className="w-full h-full gap-4 flex flex-col p-2">
          <div className="w-full h-full gap-4 flex flex-col">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-14"></div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className=" p-2 border flex items-center">
              <IoRemoveSharp className="cursor-pointer mr-6 ml-2" />
              <span className="select-none">
                <div className="skeleton h-4 w-10"></div>
              </span>
              <IoAddSharp className="cursor-pointer ml-6 mr-2" />
            </div>
            <button className="border-primary hover:border-b primary ml-2 uppercase text-xs cursor-pointer">
              <div className="skeleton h-4 w-20"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
