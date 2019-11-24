import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

export default firebase;
