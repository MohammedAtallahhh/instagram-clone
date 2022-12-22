/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { GlobalContext } from "../context/globalContext";
import { actions } from "../context/actions";
import { getUserByAuthId } from "../herlpers/firebase";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-hot-toast";
import { AnimatePage } from "../components";

const classes = {
  container:
    "flex flex-col md:flex-row py-5 lg:py-20 justify-center items-center gap-10 mx-auto w-[90%] max-w-[1200px] bg-blue-500",
  formLogo:
    "flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded",
  input:
    "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-3",
  submitButton: "bg-blue-medium text-white w-full rounded h-12 font-bold",

  formFooter:
    "flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary",
};

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const {
    state: { user },
    dispatch,
  } = useContext(GlobalContext);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      const userData = await getUserByAuthId(user.uid);

      dispatch({ type: actions.LOGIN, payload: userData });
      //
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user && router.pathname !== "/") {
      router.push("/");
    }
  }, [user, router]);

  const { container, formLogo, input, submitButton, formFooter } = classes;

  return (
    <>
      {/* Page title */}
      <Head>
        <title>Login</title>
      </Head>
      <AnimatePage>
        {/* {!user ? ( */}
        <div className={container}>
          {/* Login image */}
          <div className="flex max-w-[250px] lg:max-w-[350px]">
            <img
              src="/images/login-photo.png"
              alt="iPhone with Instagram app"
            />
          </div>

          {/* Login form */}
          <div className="flex flex-col max-w-[330px]">
            <div className={formLogo}>
              <h1 className="flex justify-center w-full">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="w-6/12 mt-2 mb-4"
                />
              </h1>

              <form onSubmit={handleLogin} method="POST">
                <input
                  aria-label="Enter your email address"
                  type="text"
                  placeholder="Email address"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
                  className={input}
                />
                <input
                  aria-label="Enter your password"
                  type="password"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                  className={input}
                />
                <button
                  disabled={isInvalid}
                  type="submit"
                  className={`${submitButton} ${isInvalid && "opacity-50"}`}
                >
                  Login
                </button>
              </form>
            </div>

            {/* Form footer */}
            <footer className={formFooter}>
              <p className="text-sm">
                Don't have an account? {/* Sign up link */}
                <Link href="/sign-up" className="font-bold text-blue-medium">
                  Sign up
                </Link>
              </p>
            </footer>
          </div>
        </div>
        {/* ) : null} */}
      </AnimatePage>
    </>
  );
};

export default Login;
