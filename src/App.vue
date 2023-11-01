<template>
  <div id="app" class="modal">
    <LoginView v-if="!isValid" />
    <ContentView v-else />
  </div>
</template>

<script>
import { useApiKeyStore } from './stores/apiKey';
import LoginView from './views/LoginView.vue';
import ContentView from './views/ContentView.vue';
import { computed } from 'vue';

export default {
  components: {
    LoginView,
    ContentView,
  },
  setup() {
    const apiKeyStore = useApiKeyStore();
    const isValid = computed(() => apiKeyStore.isValid);
    
    return {
      isValid
    };
  },
};
</script>


<style scoped>
@import "./assets/obsidian.css";
</style>