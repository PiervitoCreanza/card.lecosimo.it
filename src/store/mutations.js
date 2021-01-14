const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setAuthError(state, payload) {
    state.authError = payload;
  },

  setComingFromLogin(state, payload) {
    state.comingFromLogin = payload;
  },

  setAuthLoading(state, payload) {
    state.isAuthLoading = payload;
  },
};

export default mutations;
