import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";
import { useNavigate } from 'react-router-dom';

const ResetPasswordwithEmail = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state

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

      // Make an API request to initiate the password reset
      const response = await fetch("http://localhost:8088/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        console.log("Password reset email sent successfully:", result.message);
        setVerificationMessage(
          <div className="flex items-center justify-between bg-primary text-xl mt-8 animate-bounce">
            Please verify your email before logging in.
          </div>
        );
        setIsFormSubmitted(true); // Set the state to true after successful submission
        // Optionally, you can redirect the user to a success page or display a success message
        // navigate("/success");
      } else {
        // Handle error response from the server
        console.error("Error sending password reset email:", result.error || "An unexpected error occurred.");
        setErrMsg({
          status: "failed",
          message: result.error || "An unexpected error occurred.",
        });
      }
    } catch (error) {
      // Handle errors (display error message to the user)
      console.error("Error sending password reset email:", error);
      setErrMsg({
        status: "failed",
        message: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
    <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
      <p className="text-ascent-1 text-lg font-semibold">Forgot Password</p>

      <span className="text-sm text-ascent-2">Enter Your Email</span>
      {verificationMessage}

      <form onSubmit={handleSubmit(onSubmit)} className="py-4 flex flex-col gap-5">
        <TextInput
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          styles="w-full rounded-full text-black"
          labelStyle="ml-2"
          register={register("email", {
            required: "Email is required!",
          })}
          disabled={isFormSubmitted} // Disable the input field if the form is submitted
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

{isFormSubmitted ? (
            <CustomButton
              type="button"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
              title="Submit"
              disabled
            />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
              title="Submit"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordwithEmail;
