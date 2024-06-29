import toast from "react-hot-toast";

export const handleError = async (err: any) => {
  console.log("ShritCodeError: ", err);
  const errorMessage =
    err.message || String(err) || "An unexpected error occurred";

  toast.error(errorMessage);
  throw new Error(errorMessage);
};
