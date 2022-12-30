import google from "../images/google.svg";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { GetHash } from "../utils/Common";

import { auth } from "../firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const history = useNavigate();

  let user = localStorage.getItem("user_token");

  if (user) {
    history("/home");
  }

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // const newWindow = useRef(null);

  const signInWithGoogle = () => {
    const google_provider = new GoogleAuthProvider();
    google_provider.setCustomParameters({
      prompt: "select_account",
    });

    signInWithPopup(auth, google_provider)
      .then((result) => {
        const user = result.user;
        const token = user.uid;

        localStorage.setItem("user_token", GetHash(token));
        localStorage.setItem("user_name", user.email);

        history("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const registerWithEmailPassword = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (email === "" || password === "") {
      alert("One or more of the fields have not been filled!");
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user.uid;

        localStorage.setItem("user_token", GetHash(token));
        localStorage.setItem("user_name", user.email);

        history("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const signInWithEmailPassword = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (email === "" || password === "") {
      alert("One or more of the fields have not been filled!");
      return;
    }

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user.uid;

        localStorage.setItem("user_token", GetHash(token));
        localStorage.setItem("user_name", user.email);

        history("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen min-w-full">
      <div className="p-10 rounded bg-white flex flex-col justify-center items-center">
        <h1 className="text-black text-4xl mb-5">Login</h1>
        <button
          className="outline-none m-2 dark:bg-white border-blue-500 border-2 text-blue-500 bg-gray-300 rounded p-2  w-72 flex justify-center items-center"
          onClick={signInWithGoogle}
        >
          <img className="mr-2 h-7" src={google} alt="google" />
          Sign in with Google
        </button>
        <div className="flex justify-center items-center mt-4">
          <hr className="w-32 mr-3 border-black" />
          <h1 className="text-black">OR</h1>
          <hr className="w-32 ml-3 border-black" />
        </div>
        <div className="container flex justify-center items-center flex-col dark:text-white bg-white text-black mt-4">
          <div className="mb-3">
            <label className="mb-1 text-black" htmlFor="email">
              Email:
            </label>
            <Input
              id="email"
              ref={emailInputRef}
              type="email"
              className="px-3 py-3 placeholder-black text-black border-black border-2 bg-white relative rounded text-sm shadow outline-none focus:outline-none focus:ring w-72"
            />
          </div>
          <div className="mb-3">
            <label className="mb-1 text-black" htmlFor="password">
              Password:
            </label>
            <Input
              id="password"
              ref={passwordInputRef}
              type="password"
              className="px-3 py-3 border-black border-2 placeholder-black text-black bg-white relative rounded text-sm shadow outline-none focus:outline-none focus:ring w-72"
            />
          </div>
          <div className="mt-3">
            <Button
              className="px-3 py-3 border-black border-2 dark:bg-white text-black bg-gray-300 w-72 rounded"
              text="Sign In"
              onClick={signInWithEmailPassword}
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <hr className="w-32 mr-3 border-black" />
            <h1 className="text-black">OR</h1>
            <hr className="w-32 ml-3 border-black" />
          </div>
          <div className="mt-3">
            <Button
              className="px-3 py-3 border-black border-2 dark:bg-white text-black bg-gray-300 w-72 rounded"
              text="Register"
              onClick={registerWithEmailPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
