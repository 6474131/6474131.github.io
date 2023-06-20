<template>
  <div class="btn-group">
    <input id="signInButton" v-model="checked" autocomplete="off" class="btn-check" name="btnradio" type="radio"
           value="signIn">
    <label class="btn btn-outline-primary" for="signInButton">Sign in</label>

    <input id="signUpButton" v-model="checked" autocomplete="off" class="btn-check" name="btnradio" type="radio"
           value="signUp">
    <label class="btn btn-outline-primary" for="signUpButton">Sign up</label>

  </div>

  <form v-if="checked === 'signIn'" @submit.prevent="signInWithPassword">
    <label>
      Email
      <input v-model="email" type="text"/>
    </label>
    <label>
      Password
      <input v-model="password" type="password"/>
    </label>
    <button type="submit">Log in</button>
  </form>
  <form v-if="checked === 'signUp'" @submit.prevent="signUpWithPassword">
    <label>
      Email
      <input v-model="email" type="text"/>
    </label>
    <label>
      Password
      <input v-model="password" type="password"/>
    </label>
    <button type="submit">Log in</button>
  </form>
  <div v-show="errorVisible"> {{ error }}
  </div>


</template>

<script>

import { useFirebaseAuth, useFirestore } from "vuefire";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "@/js/firebase_objects/users-object";

const db = useFirestore();
export default {
  name: "LoginPage",
  data() {
    return {
      email:        "",
      password:     "",
      checked:      "signIn",
      error:        "",
      errorVisible: false,
    };
  },
  methods: {
    signInWithPassword() {
      signInWithEmailAndPassword(useFirebaseAuth(), this.email, this.password).then((userCred) => {
        console.log("User logged in: " + userCred.operationType);
        this.errorVisible = false;
      }).catch((reason) => {
        console.log("Couldn't sign in because: " + reason);
        this.error        = reason;
        this.errorVisible = true;
        setTimeout(() => {
          this.errorVisible = false;
        }, 5000);
      });
    },
    signUpWithPassword() {
      createUserWithEmailAndPassword(useFirebaseAuth(), this.email, this.password).then((userCred) => {
        console.log("User signed up with type: " + userCred.operationType);
        const uid     = userCred.user.uid;
        const userRef = doc(db, 'users', uid).withConverter(User.postConverter);
        setDoc(userRef, {
          userId: uid,
          email:  this.email,
        }).then(() => {
          console.log("User has been created.");
          this.errorVisible = true;
        });
      }).catch((reason) => {
        console.log("Couldn't sign up because: " + reason);
        this.error        = reason;
        this.errorVisible = true;
        setTimeout(() => {
          this.errorVisible = false;
        }, 2000);
      });
    },
  },
};
</script>

<style scoped>

</style>