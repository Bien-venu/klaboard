import { toast } from "react-hot-toast";

const shouldSkipToast = (message: string) =>
  message.trim().toLowerCase() === "something went wrong";

export const showSuccess = (message: string) => {
    console.log(message);
  if (shouldSkipToast(message)) return;
  toast.success(message);
};

export const showError = (message: string) => {
  if (shouldSkipToast(message)) return;
  toast.error(message);
};
