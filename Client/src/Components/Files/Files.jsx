import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { useSelector } from "react-redux";

import Logout from "../Auth/Logout";

import Button from "../Utils/Button";
import Modal from "../Utils/Modal";

export default function Files() {
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.FormReducer);

  return (
    <div className="h-screen w-screen">
      <Toaster position="top right" />
      <p className="font-bold text-5xl text-center uppercase">Files</p>
      <div className="flex container mx-auto items-center justify-end">
        <div>
          <Logout />
        </div>
      </div>
      <ul className="flex gap-x-2 w-full flex justify-center">
        <li>
          <Button
            type={"button"}
            onclick={() => navigate("uploadfiles")}
            label={"Upload Your Files"}
            styles={["px-4 bg-orange-400 text-white"]}
          />
        </li>
        <li>
          <Button
            type={"button"}
            onclick={() => navigate("getfiles")}
            label={"Get Your Files"}
            styles={["px-4 bg-yellow-500 text-white"]}
          />
        </li>
      </ul>
      <div className="flex justify-center">
        <Outlet />
      </div>
      {isLoading === true ? <Modal /> : null}
    </div>
  );
}
