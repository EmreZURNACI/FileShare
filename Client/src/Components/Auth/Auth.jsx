import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";

import Button from "../Utils/Button";
import Modal from "../Utils/Modal";

import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Auth() {
  const { isLoading } = useSelector((state) => state.FormReducer);

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <Toaster position="top right" />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>
        {isLogin ? <Login /> : <Register />}
        <div className="flex items-center justify-center">
          <Button
            onclick={toggleForm}
            label={
              isLogin
                ? "Hesabın yok mu ? Kayıt ol"
                : "Zaten üye misin ? Giriş yap"
            }
            type={"button"}
            styles={[
              "text-underline bg-transparent border-0 text-black underline",
            ]}
          />
        </div>
      </div>
      {isLoading === true ? <Modal /> : null}
    </div>
  );
}
