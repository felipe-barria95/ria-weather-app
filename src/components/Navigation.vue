<template>
    <header class="sticky top-0 bg-white shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-weather-primary py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <img
                        class="w-[50px] h-auto"
                        src="https://getvectorlogo.com/wp-content/uploads/2022/07/ria-money-transfer-vector-logo-2022.png"
                    />
                    <p class="text-2xl">Weather App</p>
                </div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end">
                <i 
                    class="fa-solid fa-circle-info text-xl Chover: text-weather-secondary duration-150 cursor-pointer"
                    @click="toggleModal"
                ></i>
                <i class="fa-solid fa-plus text-xl Chover: text-weather-secondary duration-150 cursor-pointer"></i>
            </div>
            <BaseModal
                :modalActive="modalActive"
                @close-modal="toggleModal"
            >
                <h1 class="text-black">Hello from Modal</h1>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
    import { ref } from "vue"
    import { RouterLink } from "vue-router"
    import BaseModal from './BaseModal.vue'

    const modalActive = ref(null);
    const toggleModal = () => {
        modalActive.value = !modalActive.value;
    };
</script>
