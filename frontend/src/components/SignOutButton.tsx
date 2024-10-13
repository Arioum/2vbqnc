import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); // forcefully validate so that we don't need to refresh
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center text-blue-600 px-3 h-full font-bold rounded-[4px] bg-white hover:bg-slate-100 ${className}"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
