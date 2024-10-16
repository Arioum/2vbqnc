import { useEffect } from "react"; // Import useEffect
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast, isLoggedIn } = useAppContext(); // Get isLoggedIn from context
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      // 1. show the toast
      // 2. navigate to the home page
      queryClient.invalidateQueries("validateToken"); // forcefully validate so that we don't need to refresh
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      navigate(location.state?.from?.pathname || "/dashboard");
    },
    onError: (err: Error) => {
      // 1. toast
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Redirect to the dashboard
    }
  }, [isLoggedIn, navigate]);

  return (
    <form className="max-w-[400px] mx-auto flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password with 6 or more characters",
            },
          })}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </label>
      <span className="flex items-center justify-between">
        <button
          type="submit"
          className="flex justify-center items-center text-[#F9F9F8] w-full p-3 font-bold rounded-[4px] bg-blue-600 hover:bg-blue-700"
        >
          Login
        </button>
      </span>
      <span className="text-sm">
        Not Registered?{" "}
        <Link className="underline" to="/register">
          Create an account here
        </Link>
      </span>
    </form>
  );
};

export default SignIn;
