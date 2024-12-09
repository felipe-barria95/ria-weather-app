<template>
    <div v-if="isLoading || !weatherData">
        <CityViewSkeleton />
    </div>
    <div v-else>
        <CityDetail :weatherData="weatherData"/>
    </div>
</template>

<script setup>
import CityViewSkeleton from './CityViewSkeleton.vue'
import CityDetail from './CityDetail.vue'

import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const APIKey = '482944e26d320a80bd5e4f23b3de7d1f'
const weatherData = ref(null)
const isLoading = ref(false)
const route = useRoute()
const getWeatherData = async (lat, lon) => {
    isLoading.value = true
    try {
        const response = await axios.get(
            `/weathermapapi/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
        )
        await new Promise((res) => setTimeout(res, 1000))
        const offsetSeconds = response.data.city.timezone
        const currentDate = new Date()
        const adjustedDate = new Date(
            currentDate.getTime() + offsetSeconds * 1000
        )
        response.data.current = adjustedDate
        weatherData.value = response.data;
    } catch (err) {
        console.log(err)
    } finally {
        isLoading.value = false
    }
}

getWeatherData(route.params.lat, route.params.lon)


import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to, from, next) => {
    if (to.params.lat !== from.params.lat || to.params.lon !== from.params.lon) {
        getWeatherData(to.params.lat, to.params.lon)
    }
    next()
})

</script>
