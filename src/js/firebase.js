import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:            "AIzaSyD4_CON-6Fdh0sz6sLJLbHKLVSDEJnhfIQ",
  authDomain:        "web-cap-maker-project.firebaseapp.com",
  projectId:         "web-cap-maker-project",
  storageBucket:     "web-cap-maker-project.appspot.com",
  messagingSenderId: "496961765366",
  appId:             "1:496961765366:web:82aeb19b1a006ecc7711d7",
};

export const firebaseApp = initializeApp(firebaseConfig);
