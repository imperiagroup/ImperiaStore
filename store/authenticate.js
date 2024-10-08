import { defineStore } from "pinia";

export const useAuthenticated = defineStore("authenticate", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },

    setIsAuthenticated(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
    },
  },
});
