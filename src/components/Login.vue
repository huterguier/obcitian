<template>
  <div class="login">
    <div class="input-group">
      <input id="tokenInputField" v-model="token" type="password" placeholder="Enter token here" class="input-field">
    </div>
    <div class="button-group">
      <button id="tokenButton" @click="setApiKey" class="mod-cta" type="submit">Submit</button>
    </div>
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

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 300px;
  margin: auto;
}

.input-group,
.button-group {
  margin: 10px 0;
}

.input-field {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

button.mod-cta {
  background-color: rgb(138, 92, 245);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.mod-cta:hover {
  background-color: rgb(118, 72, 225);
}
</style>
