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

const classes = {
  header: "h-16 bg-white border-b border-gray-primary mb-8",
  contianer: "w-[90%] max-w-[1000px] mx-auto h-full",
  logo: "text-gray-700 text-center flex items-center align-items cursor-pointer",
  navActions: "text-gray-700 text-center flex items-center gap-5",
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
            <h1 className="flex justify-center w-full">
              <Link href="/" aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>

          <div className={navActions}>
            {user ? (
              <>
                {/* Home icon */}
                <Link href="/" aria-label="Dashboard">
                  <AiOutlineHome size={32} />
                </Link>

                {/* User icon */}
                <div className="flex items-center cursor-pointer">
                  <Link href={`/p/${user?.auth_id}`}>
                    {" "}
                    <img
                      className="rounded-full w-10 flex border border-gray-light"
                      src={DEFAULT_IMAGE_PATH}
                      alt={`${user?.username} profile`}
                    />
                  </Link>
                </div>

                {/* Logout button */}
                <button
                  type="button"
                  title="Sign Out"
                  onClick={handleSignOut}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSignOut();
                    }
                  }}
                >
                  <IoMdExit size={32} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button type="button" className={loginButton}>
                    Log In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button type="button" className={signUpButton}>
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
