import { defineStore } from 'pinia'

export const useLoggerStore = defineStore('LoggerStore', {
  state: () => {
    return {
      isLogged: false,
      publicKey: ""
    }
  },
  actions: {
    auth(key) {
      this.isLogged = true;
      this.publicKey = key;
    }
  }
})
