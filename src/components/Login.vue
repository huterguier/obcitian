<template>
  <div class="obsidian theme-dark">
      <input id="tokenInputField" v-model="token" type="password" placeholder="Enter token here" class="input-field">
      <button id="tokenButton" @click="setApiKey" class="mod-cta" type="submit">Submit</button>
      <Icon />
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

<script>
  import Icon from '../components/Icon.vue';

  export default {
    components: {
      Icon,
    },
  };
</script>

<style scoped>
@import "../assets/obsidian.css";
</style>