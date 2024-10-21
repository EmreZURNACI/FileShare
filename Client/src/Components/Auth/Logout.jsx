import Button from "../Utils/Button";

import { useNavigate } from "react-router-dom";

import {
  setAuth,
  setEmail,
  setPassword,
  clearFiles,
} from "../../Redux/FormDataSlice";
import { useDispatch } from "react-redux";

import { SuccessNotify } from "../Utils/Helpers";

import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setAuth(false));
    dispatch(clearFiles());
    navigate("/");
    SuccessNotify("Hesaptan çıkış yapıldı.");
  };

  return (
    <Button
      type={"submit"}
      label={<FiLogOut className="text-3xl" />}
      onclick={() => handleClick()}
      styles={[
        "bg-red-500 flex text-white justify-center items-center rounded-lg",
      ]}
    />
  );
}
