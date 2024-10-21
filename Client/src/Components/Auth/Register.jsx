import React, { useState } from "react";

import axios from "axios";

import TextInput from "../Utils/TextInput";
import Button from "../Utils/Button";
import { ErrNotify, SuccessNotify } from "../Utils/Helpers";

import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword, setLoading } from "../../Redux/FormDataSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.FormReducer);

  const [repassword, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    SignUp({ email, password, repassword })
      .then((res) => {
        if (res.status === false) {
          ErrNotify(res.message);
        } else {
          SuccessNotify(res.message);
        }
      })
      .catch((err) => {
        ErrNotify(err.message);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const SignUp = async ({ email, password, repassword }) => {
    if (!email || !password || !repassword) {
      const res = {
        status: false,
        message: "Tüm alanlar doldurulmalıdır.",
      };
      return res;
    }

    if (password !== repassword) {
      const res = {
        status: false,
        message: "Şifreler eşleşmiyor.",
      };
      return res;
    }

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        data: {
          email: email,
          password: password,
        },
      });
      return response.data;
    } catch (err) {
      const res = {
        status: false,
        message: "Şifreler eşleşmiyor.",
      };
      return res;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 my-4">
            Yeni hesap oluştur
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

          <div className="mt-4">
            <TextInput
              type={"password"}
              name={"repassword"}
              label={"Şifre"}
              placeholder={"Şifrenizi tekrar giriniz..."}
              val={repassword}
              setVal={(e) => setRePassword(e)}
            />
          </div>

          <Button type={"submit"} label={"Kaydol"} />
        </form>
      </div>
    </>
  );
}
