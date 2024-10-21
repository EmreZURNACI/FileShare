import { useEffect, useState, useCallback } from "react";

import axios from "axios";

import { ErrNotify, SuccessNotify } from "../Utils/Helpers";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Redux/FormDataSlice";

import { FaFile } from "react-icons/fa";

import Zip from "./Zip";

export default function GetFiles() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.FormReducer);

  const GetFilesOfUser = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/file/listfiles",
        data: {
          email: email,
        },
        responseType: "json",
      });
      dispatch(setLoading(false));

      if (res.data.status === false) {
        ErrNotify(res.data.message);
      } else {
        setFiles(res.data.files);
        SuccessNotify(res.data.message);
      }
    } catch (err) {
      dispatch(setLoading(false));
      ErrNotify(
        JSON.stringify(err.response ? err.response.data : err.message, null, 2),
      );
    }
  }, [dispatch, email]);

  const downloadFile = async (filename) => {
    dispatch(setLoading(true));
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/file/downloadfile`,

        data: {
          email: email,
          filename: filename,
        },
        responseType: "blob",
      });
      dispatch(setLoading(false));
      SuccessNotify(filename + " adlı dosya indiriliyor");
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute(
        "download",
        btoa(String(Date.now()) + filename) +
          `.${String(filename).split(".")[1]}`,
      );
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      dispatch(setLoading(false));
      ErrNotify("Dosya indirilirken bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    GetFilesOfUser();
  }, [GetFilesOfUser]);

  return (
    <div className="w-[calc(50%)] flex flex-col items-center justify-center my-4">
      <div className="w-full grid grid-cols-4 gap-6">
        {Array.from(files).length !== 0 &&
          Array.from(files).map((file, key) => (
            <div
            key={key}
              className="relative flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => downloadFile(file)}
            >
              <FaFile className="text-3xl" />
              <span>{file}</span>

              {/* Tooltip */}
              <span className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                {file} indir
              </span>
            </div>
          ))}
      </div>
      {Array.from(files).length !== 0 && <Zip />}
    </div>
  );
}
