<template>
    <div
      v-html="require(`../../public/icons/accessibility.svg`)"
      class="inline-block fill-current"
      style="height: 1em; width: 1em; vertical-align: -0.125em;"
    />
  </template>
   
<script>
    export default {
        props: {
            name: {
            type: String,
            required: true,
            }
        }
    }
</script>

<style scoped>
    @import "../assets/obsidian.css";
</style>