 <template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <NavigationBar />
    <SearchView />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <FooterBar />
  </div>
 </template>

 <script setup>
  import { RouterView } from 'vue-router';
  import NavigationBar from './components/NavigationBar.vue'
  import SearchView from './views/SearchView.vue';
  import FooterBar from './components/FooterBar.vue';
</script>

<style>
  .page-enter-active {
    transition: 600ms ease all;
  }

  .page-enter-from {
    opacity: 0;
  }
</style>
