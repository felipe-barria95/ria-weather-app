<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search for a city" 
        class="py-2 px-1 w-full bg-transparent border-b •focus: border-weather-secondary focus: outline-none focus: shadow-[Opx_1px_0_0_#004E71]"
      >
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  const searchQuery = ref('');
</script>