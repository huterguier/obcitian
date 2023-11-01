<template>
  <div class="login">
    <input v-model="token" type="password" placeholder="Enter token here">
    <button @click="setApiKey" class="btn-cta" type="submit">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApiKeyStore } from "../stores/apiKey"

const apiKeyStore = useApiKeyStore()
const token = ref('')

const setApiKey = () => {
  apiKeyStore.setApiKey(token.value)
}
</script>

<style>
</style>
