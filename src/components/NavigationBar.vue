<template>
    <header class="sticky top-0 bg-white shadow-lg">
        <nav
            class="container flex flex-col sm:flex-row items-center gap-4 text-weather-primary py-4"
        >
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <img
                        class="w-[50px] h-auto"
                        src="https://getvectorlogo.com/wp-content/uploads/2022/07/ria-money-transfer-vector-logo-2022.png"
                    />
                    <p class="text-xl">Weather App</p>
                </div>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
