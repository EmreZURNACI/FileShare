import toast from "react-hot-toast";

export const ErrNotify = (message) => {
  toast.error(message);
};
export const SuccessNotify = (message) => {
  toast.success(message);
};
