import { auth, firebase } from "@/assets/js/firebase";
import router from "@/router";
/*
const handleRedirect = (route) => {
  if (!route || !route.query.redirect) {
    console.log("no route passed");
    return router.push("/user");
  }
  router.push(route.query.redirect);
};*/

const actions = {
  signUpAction({ commit }, payload) {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        commit("setUser", response.user);
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  signInAction({ commit }, payload) {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  signInWithGoogleAction({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider();

    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
      // Check if we are on a mobile device
      auth.signInWithRedirect(provider);
      return auth.getRedirectResult().catch((error) => {
        commit("setError", error.message);
      });
    }

    return auth.signInWithPopup(provider).catch((error) => {
      commit("setError", error.message);
    });
  },
  signOutAction({ commit }) {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
        router.push("/");
        commit("setUser", null);
      })
      .catch((error) => {
        console.log(error);
        commit("setError", error.message);
      });
  },
  authAction({ commit }) {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return commit("setUser", null);
      }
      user.getIdTokenResult().then((isTokenResult) => {
        console.log(isTokenResult.claims);
        commit("setUser", {
          ...user,
          isRetailer: !!isTokenResult.claims.isRetailer,
        });

        // Redirect if on login page
        if (router.currentRoute.value.query.redirect) {
          return router.push(router.currentRoute.value.query.redirect);
        }

        if (
          ["ViewCard", "RetailerHome", "UserHome"].includes(
            router.currentRoute.value.name
          )
        ) {
          return;
        }
        router.push({
          name: isTokenResult.claims.isRetailer ? "RetailerHome" : "UserHome",
        });
      });
    });
  },
};

export default actions;
