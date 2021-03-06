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
        commit("setAuthError", error.message);
      });
  },
  signInAction({ commit }, payload) {
    //commit("setAuthLoading", true);
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        router.push({ name: "RetailerHome" });
      })
      .catch((error) => {
        commit("setAuthError", error);
        //commit("setAuthLoading", false);
      });
  },
  signInWithGoogleAction({ commit }) {
    commit("setAuthLoading", true);
    commit("setComingFromLogin", true);
    const provider = new firebase.auth.GoogleAuthProvider();

    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
      // Check if we are on a mobile device
      auth.signInWithRedirect(provider);
      return auth.getRedirectResult().catch((error) => {
        commit("setAuthError", error.message);
        commit("setAuthLoading", false);
      });
    }

    return auth.signInWithPopup(provider).catch((error) => {
      commit("setAuthError", error.message);
      commit("setAuthLoading", false);
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
        commit("setAuthError", error.message);
      });
  },
  authAction({ commit, state }) {
    auth.onAuthStateChanged((user) => {
      commit("setAuthLoading", false);
      console.log("%c Auth completed", "background: #222; color: #bada55");
      if (!user) {
        return commit("setUser", null);
      }
      user.getIdTokenResult().then((isTokenResult) => {
        console.log(isTokenResult.claims);
        commit("setUser", {
          ...user,
          isRetailer: !!isTokenResult.claims.isRetailer,
        });

        // Redirect if necessary
        if (router.currentRoute.value.query.redirect) {
          router.push(router.currentRoute.value.query.redirect);
        } else if (state.comingFromLogin) {
          router.push({
            name: isTokenResult.claims.isRetailer ? "RetailerHome" : "UserHome",
          });
        }

        commit("setComingFromLogin", false);
      });
    });
  },
};

export default actions;
