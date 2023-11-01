import { defineStore } from 'pinia'

export const useApiKeyStore = defineStore("apiKey", {
  state: () => {
    return {
      apiKey: ""
    }
  },
  getters: {
    isValid() {
      return this.apiKey.length > 0
    }
  },
  actions: {
    setApiKey(apiKey) {
      this.apiKey = apiKey
    },
  }
})