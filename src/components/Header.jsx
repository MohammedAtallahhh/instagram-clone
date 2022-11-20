/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { signOut } from "firebase/auth";

import { GlobalContext } from "../context/globalContext";
import { DEFAULT_IMAGE_PATH } from "../constants";
import { auth } from "../lib/firebase";
import { actions } from "../context/actions";

import { AiOutlineHome } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import useUser from "../hooks/useUser";

const classes = {
  header: "h-16 bg-white border-b border-gray-primary mb-8",
  contianer: "w-[90%] max-w-[1400px] mx-auto max-w-screen-lg h-full",
  logo: "text-gray-700 text-center flex items-center align-items cursor-pointer",
};

const Header = () => {
  const {
    state: { user: loggedUser },
    dispatch,
  } = useContext(GlobalContext);

  const user = useUser(loggedUser?.uid);

  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    dispatch({ type: actions.LOGOUT });
    router.push("/login");
  };

  const { header, contianer, logo } = classes;
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

          <div className="text-gray-700 text-center flex items-center gap-5">
            {loggedUser ? (
              <>
                {/* Home icon */}
                <Link href="/" aria-label="Dashboard">
                  <AiOutlineHome size={30} />
                </Link>

                {/* User icon */}
                <div className="flex items-center cursor-pointer">
                  <Link href={`/p/${user?.username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/${user?.username}.jpg`}
                      alt={`${user?.username} profile`}
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                      }}
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
                  <IoMdExit size={30} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
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
