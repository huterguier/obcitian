<script>
import Property from '../components/Property.vue';

export default {
  components: {
    Property,
  },
  data() {
    return {
      properties: [{key: "InitialKey", value: "InitialValue"}], // Start with one Property component
    };
  },
  methods: {
    handleAddProperty() {
      // Add a new object to the properties array
      // This will cause a new Property component to be rendered
      this.properties.push({ key: "NewKey", value: "NewValue"});
    },
  },
};
</script>

<template>
    <div class="obsidian theme-dark metadata-container" style="width: 600px"> 
        <div class="metadata-properties-heading" tabindex="0">
            <div id="referenceTitle" style="color: var(--color-accent)" class="metadata-properties-title">
                <p>BibKey...</p>
            </div>
        </div>
        <div class="metadata-content">
            <div id="referenceProperties" class="metadata-properties">
                <Property v-for="(property, index) in properties" :key="index" :propertyKey="property.key" :propertyValue="property.value" />
            </div>
            <div @click="handleAddProperty" id="referenceAddProperty" class="metadata-add-button text-icon-button" tabindex="0">
                <span class="text-button-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-plus">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </span>
                <span class="text-button-label">Add property</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../assets/obsidian.css";
</style>