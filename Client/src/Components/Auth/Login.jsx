import React from "react";

import axios from "axios";

import TextInput from "../Utils/TextInput";
import Button from "../Utils/Button";
import { ErrNotify } from "../Utils/Helpers";

import {
  setEmail,
  setPassword,
  setAuth,
  setLoading,
} from "../../Redux/FormDataSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.FormReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    SignIn({ email, password })
      .then((res) => {
        if (res.status === false) {
          ErrNotify(res.message);
        } else {
          dispatch(setAuth(true));
        }
      })
      .catch((err) => {
        ErrNotify(err.message);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const SignIn = async ({ email, password }) => {
    if (!email || !password) {
      return "Tüm alanlar doldurulmalıdır.";
    }
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/auth/signin`,
        data: {
          email: email,
          password: password,
        },
      });
      return response.data;
    } catch (err) {
      return "Axiosda bir hata oluştu.";
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 my-4">
            Hesabına giriş yap
          </h2>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          autoCorrect="off"
          autoSave="off"
          autoComplete="off"
        >
          <div className="mt-4">
            <TextInput
              type={"email"}
              name={"email"}
              label={"E-posta"}
              placeholder={"E-posta adresinizi giriniz..."}
              val={email}
              setVal={(e) => dispatch(setEmail(e))}
            />
          </div>

          <div className="mt-4">
            <TextInput
              type={"password"}
              name={"password"}
              label={"Şifre"}
              placeholder={"Şifrenizi giriniz..."}
              val={password}
              setVal={(e) => dispatch(setPassword(e))}
            />
          </div>

          <Button type={"submit"} label={"Giriş yap"} />
        </form>
      </div>
    </>
  );
}
