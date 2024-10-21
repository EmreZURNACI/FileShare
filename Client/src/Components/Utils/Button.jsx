import React from "react";

export default function Button({ type, label, onclick, styles = [] }) {
  const className = [
    "w-full text-center bg-blue-500 rounded-md border text-lg font-medium py-1 px-4 text-white",
    ...styles,
  ].join("!important ");

  return (
    <button type={type} onClick={onclick} className={className}>
      {label}
    </button>
  );
}
