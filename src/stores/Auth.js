import { defineStore } from 'pinia'

export const useLoggerStore = defineStore('LoggerStore', {
  Logger: () => {
    return {
      isLogged: false
    }
  },
  actions: {
    auth() {
      this.isLogged = true
    }
  }
}
)
