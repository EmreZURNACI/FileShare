import React from "react";

import { useDispatch } from "react-redux";
import { setFiles } from "../../Redux/FormDataSlice";

import { ErrNotify, SuccessNotify } from "../Utils/Helpers";

export default function FileInput() {
  const dispatch = useDispatch();

  const reportedFileType = ["cmd", "py", "zip"];
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let totalFileSize = 0;
    let invalidMessages = [];
    let tempFiles = [];
    selectedFiles.forEach((file) => {
      let isDesired = true;
      totalFileSize += file.size;
      if (totalFileSize > 1024 * 1024 * 5) {
        isDesired = false;
        invalidMessages.push(`${file.name}:Toplam dosya boyutu 5MB aşmamalı.`);
      }

      if (String(file.name).split(".").length > 2) {
        isDesired = false;
        invalidMessages.push(`${file.name}: Dosya istenilen formatta değil.`);
      }

      if (reportedFileType.includes(String(file.name).split(".")[1])) {
        isDesired = false;
        invalidMessages.push(`${file.name}: Dosya istenilen formatta değil.`);
      }

      if (isDesired) {
        tempFiles.push(file);
      }
    });
    if (invalidMessages.length === 0) {
      dispatch(setFiles(tempFiles));
      SuccessNotify("Dosyalar başarıyla seçildi.");
    } else {
      ErrNotify(invalidMessages.join("\n"));
    }
  };

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          multiple={true}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
