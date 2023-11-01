<template>
    <div class="metadata-property" tabindex="0" data-property-key="date" data-property-type="date">
        <div class="metadata-property-key">
            <span class="metadata-property-icon" aria-disabled="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-text">
                    <path d="M17 6.1H3"></path>
                    <path d="M21 12.1H3"></path>
                    <path d="M15.1 18H3"></path>
                </svg>
            </span>
            <input class="metadata-property-key-input" type="text" value="date">
        </div>
        <div class="metadata-property-value">
            <div class="metadata-input-longtext mod-truncate" placeholder="Empty" contenteditable="true" tabindex="0">
                <p>2023-10-26</p>
            </div>
            <div class="metadata-link" style="display: none;">
                <div class="metadata-link-inner">
                    <p>2023-10-26</p>
                </div>
                <div class="metadata-link-flair">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-pencil">
                        <line x1="18" y1="2" x2="22" y2="6"></line>
                        <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
                    </svg>
                </div>
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
</script>

<style scoped>
@import "../assets/obsidian.css";
</style>