import { createStore, createLogger } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const initialState = () => {
  return {
    user: null,
    error: null,
    isLoading: false,
    authError: { code: null, message: null },
  };
};

const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger()] : [];
export const store = createStore({
  state: initialState(),
  mutations: mutations,
  actions: actions,
  getters: getters,
  plugins,
});
