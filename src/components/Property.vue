<template>
    <div class="metadata-property" tabindex="0" :data-property-key="propertyKey" data-property-type="date">
      <div class="metadata-property-key">
        <span class="metadata-property-icon" aria-disabled="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-text">
            <path d="M17 6.1H3"></path>
            <path d="M21 12.1H3"></path>
            <path d="M15.1 18H3"></path>
          </svg>
        </span>
        <input class="metadata-property-key-input" type="text" :value="propertyKey" placeholder="Key">
      </div>
      <div class="metadata-property-value">
        <div class="metadata-input-longtext mod-truncate" placeholder="Value" contenteditable="true" tabindex="0">
          {{ propertyValue }}
        </div>
      </div>
      <div class="clickable-icon metadata-property-warning-icon" aria-label="Type mismatch, expected Text" style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-alert-triangle">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
    </div>
  </template>
  
  <script setup>
  
  // Define props
  const props = defineProps(['propertyKey', 'propertyValue']);
  const { propertyKey, propertyValue } = props;
  </script>
  
  <style scoped>
    @import "../assets/obsidian.css";
  </style>
  