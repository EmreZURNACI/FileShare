import React from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { ErrNotify, SuccessNotify } from "../Utils/Helpers";

import { setLoading } from "../../Redux/FormDataSlice";

import Button from "../Utils/Button";

export default function Zip() {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.FormReducer);

  const downloadZip = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/file/getfiles`,

        data: {
          email: email,
        },
        responseType: "blob",
      });
      dispatch(setLoading(false));
      if (res.data.status === false) {
        ErrNotify(res.data.message);
      } else {
        SuccessNotify("Dosya indiriliyor");
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", btoa(String(Date.now())+email) + ".zip");
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      dispatch(setLoading(false));
      ErrNotify((err.response ? err.response.data : err.message, null, 2));
    }
  };

  return (
    <Button
      label={"Hepsini indir"}
      type={"button"}
      onclick={() => downloadZip()}
      styles={["w-full bg-gray-600 text-white my-2"]}
    />
  );
}
