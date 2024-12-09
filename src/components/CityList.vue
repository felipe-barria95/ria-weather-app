<template>
    <div class="flex flex-row w-full">
        <div
            v-for="city in cities"
            :key="city.id"
            :class="{
                'bg-weather-selected':
                    city.lat === route.params.lat &&
                    city.lon === route.params.lon,
                'bg-weather-secondary': !(
                    city.lat === route.params.lat &&
                    city.lon === route.params.lon
                ),
            }"
            class="flex-grow flex justify-center py-3 shadow-md cursor-pointer responsive-text"
            @click="previewCity(city.lat, city.lon)"
        >
            <p>{{ city.cityName }}, {{ city.country }}</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const cities = [
    {
        id: 524,
        cityName: 'Rio de Janeiro',
        country: 'Brazil',
        lat: '-22.90278',
        lon: '-43.2075',
    },
    {
        id: 529,
        cityName: 'Beijing',
        country: 'China',
        lat: '39.9075',
        lon: '116.39723',
    },
    {
        id: 534,
        cityName: 'Los Angeles',
        country: 'Unites States',
        lat: '34.05223',
        lon: '-118.24368',
    },
]

const previewCity = (lat, lon) => {
    router.push({
        name: 'cityView',
        params: { lat, lon },
    })
}
</script>

<style scoped>
.responsive-text {
    font-size: 16px;
}

@media (max-width: 768px) {
    .responsive-text {
        font-size: 14px;
    }
}
</style>
