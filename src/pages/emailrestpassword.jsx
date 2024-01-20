import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";
// import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Extract the reset token from the URL (replace this with your actual logic)
      const pathTokens = window.location.pathname.split('/');
      const resetToken = pathTokens[pathTokens.length - 1];
      
      // Make an API request to reset the password using fetch
      const response = await fetch("http://localhost:8088/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resetToken,
          password: data.password,
        }),
      });

      const result = await response.json();
      navigate("/login");
      // Handle success (you might want to redirect the user to a login page)
      console.log("Password reset successful:", result.message);

    } catch (error) {
      // Handle errors (display error message to the user)
      console.error("Error resetting password:", error);
      setErrMsg({
        status: "failed",
        message:
          error.message || "An unexpected error occurred.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6'>
      <div className='bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>
        <p className='text-ascent-1 text-lg font-semibold'>New password</p>

        <span className='text-sm text-ascent-2'>
          Enter New password
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='py-4 flex flex-col gap-5'
        >
          <TextInput
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                styles='w-full rounded-full text-black'
                labelStyle='ml-2'
                register={register("password", {
                  required: "Password is required!",
                })}
                // error={errors.password ? errors.password?.message : ""}
              />

          {errMsg?.message && (
            <span
              role='alert'
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type='submit'
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
              title='Submit'
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
