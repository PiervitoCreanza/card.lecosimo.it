const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setError(state, payload) {
    state.error = payload;
  },

  setAuthLoading(state, payload) {
    state.isAuthLoading = payload;
  },
};

export default mutations;
