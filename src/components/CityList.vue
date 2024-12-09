<template>
    <div 
        v-for="city in cities" 
        :key="city.id"
        class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer my-2"
        @click="previewCity(city.lat, city.lon)"
    >
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ city.cityName }}</h2>
            <h3>{{ city.country }}</h3>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const cities = [
        {id: 524, cityName: 'Rio de Janeiro', country: 'Brazil', lat: '-22.90278', lon: '-43.2075'},
        {id: 529, cityName: 'Beijing', country: 'China', lat: '39.9075', lon: '116.39723'},
        {id: 534, cityName: 'Los Angeles', country: 'Unites States', lat: '34.05223', lon: '-118.24368'},
    ];

    const previewCity = (lat, lon) => {
        router.push({
        name: "cityView",
        params: { lat, lon },
        })
    };
</script>