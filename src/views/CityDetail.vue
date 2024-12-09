<template>
    <div class="flex flex-col flex-1 items-center">
        <div class="flex flex-col items-center text-white">
            <h1 class="text-4xl mb-2">
                {{ weatherData.city.name }},
                {{ weatherData.city.country }}
            </h1>
            <p class="text-sm mb-12">
                {{
                    new Date(weatherData.current).toLocaleDateString('en-us', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'long',
                    })
                }}
                {{
                    new Date(weatherData.current).toLocaleTimeString('en-us', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'UTC',
                    })
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherData.list[0].main.temp) }}&deg; C
            </p>
            <p>
                Feels like
                {{ Math.round(weatherData.list[0].main.feels_like) }}&deg; C
            </p>
            <p class="capitalize">
                {{ weatherData.list[0].weather[0].description }}
            </p>
            <img
                class="w-[150px] h-auto"
                :src="`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`"
                alt=""
            />
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <div class="max-w-screen-md w-full py-12 responsive-text">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly Weather</h2>
                <div class="flex items-center justify-center">
                    <div class="flex gap-10 items-center">
                        <div
                            v-for="i in hourRange"
                            :key="weatherData.list[i].dt"
                            class="flex flex-col gap-4 items-center"
                        >
                            <p class="whitespace-nowrap">
                                {{
                                    new Date(
                                        weatherData.list[i].dt * 1000 + weatherData.offsetSeconds * 1000
                                    ).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        timeZone: 'UTC',
                                    })
                                }}
                            </p>
                            <img
                                class="w-auto h-[50px] object-cover"
                                :src="`http://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png`"
                                alt=""
                            />
                            <p>
                                {{
                                    Math.round(weatherData.list[i].main.temp)
                                }}&deg; C
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">5 Day Forecast</h2>
                <div
                    v-for="i in 5"
                    :key="weatherData.list[(8 * i) - 1].dt"
                    class="flex items-center"
                >
                    <p class="flex-1">
                        {{
                            new Date(
                                weatherData.list[(8 * i) - 1].dt * 1000
                            ).toLocaleDateString('en-US', {
                                weekday: 'long',
                            })
                        }}
                    </p>
                    <img
                        class="w-[50px] h-[50pxl object-cover"
                        :src="`http://openweathermap.org/img/wn/${weatherData.list[(8 * i) - 1].weather[0].icon}@2x.png`"
                        alt=""
                    />
                    <div class="flex gap-2 justify-end">
                        <p>
                            &uarr;{{
                                Math.round(weatherData.list[(8 * i) - 1].main.temp_min)
                            }}&deg; C
                        </p>
                        <p>
                            &darr;{{
                                Math.round(weatherData.list[(8 * i) - 1].main.temp_max)
                            }}&deg; C
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    weatherData: Object,
})
const hourRange = window.innerWidth <= 768 ? 5 : 7
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
