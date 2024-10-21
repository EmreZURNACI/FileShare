import React from "react";
export default function TextInput({
  type,
  name,
  label,
  placeholder,
  val,
  setVal,
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block mb-1 text-lg font-bold text-gray-900 uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}
