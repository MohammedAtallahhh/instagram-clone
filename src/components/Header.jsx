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
import { IoMdExit } from "react-icons/io";
import AddPost from "./AddPost";
import Skeleton from "react-loading-skeleton";

const classes = {
  header: "h-16 bg-white border-b border-gray-primary mb-8",
  contianer: "w-[90%] max-w-[1000px] mx-auto h-full",
  logo: "items-center align-items cursor-pointer hidden md:flex",
  navActions:
    "text-4xl flex items-center justify-center gap-8 w-full md:gap-5 md:w-[unset] md:text-3xl",
  loginButton: "bg-blue-medium font-bold text-sm rounded text-white w-20 h-8",
  signUpButton: "font-bold text-sm rounded text-blue-medium w-20 h-8",
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
        <div className="flex justify-between h-full">
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
                <div className="flex items-center cursor-pointer w-10 md:w-9">
                  <Link href={`/p/${user?.auth_id}`}>
                    {" "}
                    <img
                      className="rounded-full border border-gray-light"
                      src={DEFAULT_IMAGE_PATH}
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
                <Link href="/sign-up" className="hidden md:inline-block">
                  <button type="button" name="sign-up" className={signUpButton}>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
