/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { signOut } from "firebase/auth";

import { auth } from "../lib/firebase";
import { GlobalContext } from "../context/globalContext";
import { DEFAULT_IMAGE_PATH } from "../constants";
import { actions } from "../context/actions";

import { AiOutlineHome } from "react-icons/ai";
import AddPost from "./AddPost";
import Skeleton from "react-loading-skeleton";

const classes = {
  header: "h-16 bg-white border-b border-gray-primary mb-8",
  contianer:
    "w-[90%] max-w-[1000px] flex justify-between items-center mx-auto h-full",
  logo: "items-center align-items cursor-pointer hidden md:flex",
  navActions:
    "text-3xl flex items-center justify-center gap-5 w-full md:gap-5 md:w-[unset]",
  loginButton: "bg-blue-medium font-bold text-sm rounded text-white px-5 py-2",
  signUpButton: "font-bold text-sm rounded text-blue-medium px-5 py-2",
};

const Header = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user } = state;

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    await dispatch({ type: actions.LOGOUT });
    router.push("/login");
  };

  const { header, contianer, logo, navActions, loginButton, signUpButton } =
    classes;
  return (
    <header className={header}>
      <div className={contianer}>
        {/* Logo */}
        <div className={logo}>
          <Link href="/" aria-label="Instagram logo">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12"
            />
          </Link>
        </div>

        <div className={navActions}>
          {user === null ? (
            <Skeleton height={40} width={150} />
          ) : user ? (
            <>
              {/* Home icon */}
              <Link href="/" aria-label="Dashboard">
                <AiOutlineHome />
              </Link>

              {/* Add post button */}
              <AddPost />

              {/* User icon */}
              <div className="flex items-center cursor-pointer w-10 h-10 md:w-9 md:h-9">
                <Link href={`/p/${user?.id}`} className="h-full w-full">
                  {" "}
                  <img
                    className="rounded-full w-full h-full border border-gray-light object-cover"
                    src={user?.profilePicture ?? DEFAULT_IMAGE_PATH}
                    alt={`${user?.username} profile`}
                  />
                </Link>
              </div>

              {/* Logout button */}
              <button
                type="button"
                name="sign-out"
                title="Sign Out"
                className={`${loginButton} bg-red-primary`}
                onClick={handleSignOut}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSignOut();
                  }
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button type="button" name="login" className={loginButton}>
                  Log In
                </button>
              </Link>
              <Link href="/sign-up">
                <button type="button" name="sign-up" className={signUpButton}>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
