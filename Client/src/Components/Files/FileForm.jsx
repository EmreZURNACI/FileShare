import React from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { clearFiles, setLoading } from "../../Redux/FormDataSlice";

import FileInput from "./FileInput";

import Button from "../Utils/Button";
import { ErrNotify, SuccessNotify } from "../Utils/Helpers";

export default function FileForm() {
  const dispatch = useDispatch();
  const { email, password, files } = useSelector((state) => state.FormReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const datas = new FormData();

    files.forEach((file) => {
      datas.append("files", file);
    });
    datas.append("email", email);
    datas.append("password", password);

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/file/uploadfile`,
        data: datas,
      });
      if (res.data.status === false) {
        ErrNotify(res.data.message);
      } else {
        SuccessNotify(res.data.message);
      }
    } catch (error) {
      ErrNotify(error.response.message);
    } finally {
      dispatch(clearFiles());
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <p className="text-center text-3xl font-bold my-2 uppercase">
        Upload your files
      </p>
      <form
        onSubmit={handleSubmit}
        className="2xl:w-[calc(50%)] xl:w-[calc(60%)] lg:w-[calc(70%)] md:w-[calc(80%)] sm:w-[calc(95%)] w-[calc(95%)]"
        autoComplete="off"
      >
        <FileInput />
        <Button label={"Gönder"} type={"submit"} />
      </form>
    </div>
  );
}
