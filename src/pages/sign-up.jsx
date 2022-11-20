/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../lib/firebase";
import Head from "next/head";
import Link from "next/link";
import { usernameExists } from "../herlpers/firebase";

const classes = {
  container:
    "container flex justify-center mx-auto w-[90%] max-w-[1200px] items-center h-screen",

  signUpForm:
    "flex flex-col items-center bg-white p-8 border border-gray-primary mb-4 rounded",

  input:
    "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-3",

  submitButton: "bg-blue-medium text-white w-full rounded h-12 font-bold",
  footer:
    "flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary",
};

const SignUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const exists = await usernameExists(username);

    if (!exists) {
      try {
        const createdUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );

        // authentication
        // -> emailAddress & password & username (displayName)
        // await createdUserResult.user.updateProfile({
        //   displayName: username,
        // });
        // firebase user collection (create a document)
        const usersRef = collection(db, "users");
        await addDoc(usersRef, {
          id: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: ["Wqf8HJNWqWexL66iAbJMPiPesWa2"],
          followers: [],
          dateCreated: Date.now(),
        });
        router.push("/");

        // Error Signing up
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
  };

  const { container, signUpForm, input, submitButton, footer } = classes;
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <div className={container}>
        <div className="flex flex-col max-w-[450px]">
          <div className={signUpForm}>
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
                alt="Instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>

            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleSignUp} method="POST">
              <input
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                onChange={({ target }) => setUsername(target.value)}
                value={username}
                className={input}
              />
              <input
                aria-label="Enter your full name"
                type="text"
                placeholder="Full name"
                onChange={({ target }) => setFullName(target.value)}
                value={fullName}
                className={input}
              />
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
                className={`${submitButton}
              ${isInvalid && "opacity-50"}`}
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign up footer */}
          <footer className={footer}>
            <p className="text-sm">
              Have an account?{` `}
              <Link href="/login" className="font-bold text-blue-medium">
                Login
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SignUp;
