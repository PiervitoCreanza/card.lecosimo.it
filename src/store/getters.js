const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
  isUserRetailer(state) {
    return state.user.isRetailer;
  },
  isAuthLoading(state) {
    return state.isAuthLoading;
  },
};

export default getters;
