<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city" 
        class="py-2 px-1 w-full bg-transparent border-b •focus: border-weather-secondary focus: outline-none focus: shadow-[Opx_1px_0_0_#004E71]"
      >
    </div>
  </main>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  const searchQuery = ref('');
  const queryTimeout = ref(null);
  const mapboxSearchResults = ref(null);

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value != "") {
        const result = await axios.get('/api/static/exports/cities_20000.csv');
        mapboxSearchResults.value = result;
        console.log(mapboxSearchResults.value);
        return
      }
      mapboxSearchResults.value = null;
    }, 300);
  };
</script>