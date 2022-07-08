import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./../../firebase/firebase";
import { signOut } from "firebase/auth";
import { auth } from "./../../firebase/firebase";

import configData from "../../config.json";

import { default as logo } from "../../images/rotating-logo.gif";
import Currency from "./Currency";

const Header = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const user_name = localStorage.getItem("user_name")
    ? localStorage.getItem("user_name")
    : "";

  const SignOutFromFirebase = () => {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_name");
        history("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  function logOut() {
    SignOutFromFirebase();
  }

  function logIn() {
    history("/login");
  }

  function onChangeHandler(e) {
    dispatch({ type: e.target.value });
  }

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  function openNavbar() {
    if (navbarOpen) {
      setNavbarOpen(false);
    } else {
      setNavbarOpen(true);
    }
  }

  return (
    <header className="dark:bg-gray-900 dark:text-white bg-white sticky top-0 z-50 px-8 py-3 flex space-between items-center shadow-xl w-full">
      <div className="flex items-center w-full">
        {windowDimension.winWidth > 1030 && (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-8"></img>
              </div>
              <Link
                className={
                  location.pathname === "/home"
                    ? "text-red-500 pl-5 outline-none"
                    : "pl-5 outline-none"
                }
                to="/home"
              >
                Prices
              </Link>
              <Link
                className={
                  location.pathname === "/portfolio"
                    ? "text-red-500 pl-5 outline-none"
                    : "pl-5 outline-none"
                }
                to="/portfolio"
              >
                Portfolio
              </Link>
              <Link
                className={
                  location.pathname === "/transactions"
                    ? "pl-5 text-red-500 outline-none"
                    : "pl-5 outline-none"
                }
                to="/transactions"
              >
                Transactions
              </Link>
              <Link
                className={
                  location.pathname === "/wallets"
                    ? "pl-5 text-red-500 outline-none"
                    : "pl-5 outline-none"
                }
                to="/wallets"
              >
                Wallets
              </Link>
              <Link
                className={
                  location.pathname === "/fiats"
                    ? "pl-5 text-red-500 outline-none"
                    : "pl-5 outline-none"
                }
                to="/fiats"
              >
                Fiats
              </Link>
              <Link
                className={
                  location.pathname === "/favourites"
                    ? "pl-5 text-red-500 outline-none"
                    : "pl-5 outline-none"
                }
                to="/favourites"
              >
                Favourites
              </Link>
            </div>
            <div className="flex items-center">
              {!localStorage.getItem("user_token") ? (
                <div className="ml-auto pr-5">
                  <Link
                    className="pl-5 outline-none"
                    to="/login"
                    onClick={logIn}
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="ml-auto pr-5">
                  <Link className="pl-5 outline-none" to="/" onClick={logOut}>
                    Logout [{user_name}]
                  </Link>
                </div>
              )}
              <Currency
                currencies={configData.SUPPORTED_CURRENCIES}
                onChangeHandler={onChangeHandler}
              />
            </div>
          </div>
        )}
        {windowDimension.winWidth <= 1030 && (
          <div className="nav w-full">
            <div className="logo cursor-pointer" onClick={openNavbar}>
              <div className="w-8 h-0.5 bg-white mt-2"></div>
              <div className="w-8 h-0.5 bg-white mt-2"></div>
              <div className="w-8 h-0.5 bg-white mt-2"></div>
            </div>
            {navbarOpen && (
              <div className="flex flex-col overflow-y-scroll">
                <div className="absolute mt-3 left-0 right-0 z-50 flex flex-col p-2 pb-4 m-2 space-y-3 bg-gray-900 rounded shadow transition-all">
                  <Link
                    className={
                      location.pathname === "/home"
                        ? "text-red-500 pl-5 outline-none"
                        : "pl-5 outline-none"
                    }
                    to="/home"
                  >
                    Prices
                  </Link>
                  <Link
                    className={
                      location.pathname === "/portfolio"
                        ? "text-red-500 pl-5 outline-none"
                        : "pl-5 outline-none"
                    }
                    to="/portfolio"
                  >
                    Portfolio
                  </Link>
                  <Link
                    className={
                      location.pathname === "/transactions"
                        ? "pl-5 text-red-500 outline-none"
                        : "pl-5 outline-none"
                    }
                    to="/transactions"
                  >
                    Transactions
                  </Link>
                  <Link
                    className={
                      location.pathname === "/wallets"
                        ? "pl-5 text-red-500 outline-none"
                        : "pl-5 outline-none"
                    }
                    to="/wallets"
                  >
                    Wallets
                  </Link>
                  <Link
                    className={
                      location.pathname === "/fiats"
                        ? "pl-5 text-red-500 outline-none"
                        : "pl-5 outline-none"
                    }
                    to="/fiats"
                  >
                    Fiats
                  </Link>
                  <Link
                    className={
                      location.pathname === "/favourites"
                        ? "pl-5 text-red-500 outline-none"
                        : "pl-5 outline-none"
                    }
                    to="/favourites"
                  >
                    Favourites
                  </Link>
                  {!localStorage.getItem("user_token") ? (
                    <div className="mt-3 mb-3">
                      <Link
                        className="pl-5 outline-none"
                        to="/login"
                        onClick={logIn}
                      >
                        Login
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-3 mb-3">
                      <Link
                        className="pl-5 outline-none"
                        to="/"
                        onClick={logOut}
                      >
                        Logout [{user_name}]
                      </Link>
                    </div>
                  )}
                  <div className="pl-5">
                    <Currency
                      currencies={configData.SUPPORTED_CURRENCIES}
                      onChangeHandler={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
