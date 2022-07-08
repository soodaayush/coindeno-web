import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIuJjUObcPVr82twCq9iE8F70yK1bZGlE",
  authDomain: "portfolio-9bea1.firebaseapp.com",
  databaseURL: "https://portfolio-9bea1-default-rtdb.firebaseio.com/",
  projectId: "portfolio-9bea1",
  storageBucket: "portfolio-9bea1.appspot.com",
  messagingSenderId: "407234338518",
  appId: "1:407234338518:web:d4ff8091bfedd96b7a7377",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAKx1bUy9Gbdtr3rUctEmCZhnjtxIbUV_w",
//   authDomain: "soodmax-testing.firebaseapp.com",
//   projectId: "soodmax-testing",
//   storageBucket: "soodmax-testing.appspot.com",
//   messagingSenderId: "60528940718",
//   appId: "1:60528940718:web:3ae7bd2cd865f549f9ff3f",
//   measurementId: "G-C75NY1YJ3K",
// };

// export const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(firebaseApp);
