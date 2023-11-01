import { defineStore } from 'pinia'

export const useApiKeyStore = defineStore("apiKey", {
  state: () => {
    return {
      apiKey: "null"
    }
  },
  actions: {
    isValid() {
      return this.apiKey !== null && false
    },
    setApiKey(apiKey) {
      this.apiKey = apiKey
    },
  }
})