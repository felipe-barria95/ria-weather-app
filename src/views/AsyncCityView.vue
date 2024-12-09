<template>
    <div class="flex flex-col flex-1 items-center">
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">
                {{ weatherData.data.city.name }},
                {{ weatherData.data.city.country }}
            </h1>
            <p class="text-sm mb-12">
                {{
                    new Date(weatherData.data.current).toLocaleDateString(
                        'en-us',
                        {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'long',
                        }
                    )
                }}
                {{
                    new Date(weatherData.data.current).toLocaleTimeString(
                        'en-us',
                        {
                            timeStyle: 'short',
                        }
                    )
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherData.data.list[0].main.temp) }}&deg; C
            </p>
            <p>
                Feels like
                {{ Math.round(weatherData.data.list[0].main.feels_like) }}&deg;
                C
            </p>
            <p class="capitalize">
                {{ weatherData.data.list[0].weather[0].description }}
            </p>
            <img
                class="w-[150px] h-auto"
                :src="`http://openweathermap.org/img/wn/${weatherData.data.list[0].weather[0].icon}@2x.png`"
                alt=""
            />
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <div class="text-white max-w-screen-md w-full py-12">
            <h2 class="mb-4 mx-25">Hourly Weather</h2>
            <div class="flex flex-col flex-1 items-center">
                <div class="flex gap-10 overflow-x-scroll">
                    <div
                        v-for="i in 8"
                        :key="weatherData.data.list[i].dt"
                        class="flex flex-col gap-4 items-center"
                    >
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(
                                    weatherData.data.list[i].dt * 1000
                                ).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                })
                            }}
                        </p>
                        <img
                            class="w-auto h-[50px] object-cover"
                            :src="`http://openweathermap.org/img/wn/${weatherData.data.list[i].weather[0].icon}@2x.png`"
                            alt=""
                        />
                        <p class="text-xl">
                            {{
                                Math.round(weatherData.data.list[i].main.temp)
                            }}&deg; C
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div
                    v-for="i in 4"
                    :key="weatherData.data.list[i].dt"
                    class="flex items-center"
                >
                    <p class="flex-1">
                        {{
                            new Date(
                                weatherData.data.list[8 * i].dt * 1000
                            ).toLocaleDateString('en-US', {
                                weekday: 'long',
                            })
                        }}
                    </p>
                    <img
                        class="w-[50px] h-[50pxl object-cover"
                        :src="`http://openweathermap.org/img/wn/${weatherData.data.list[8 * i].weather[0].icon}@2x.png`"
                        alt=""
                    />
                    <div class="flex gap-2 justify-end">
                        <p>
                            &uarr;{{
                                weatherData.data.list[8 * i].main.temp_min
                            }}&deg; C
                        </p>
                        <p>
                            &darr;{{
                                weatherData.data.list[8 * i].main.temp_max
                            }}&deg; C
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const APIKey = '482944e26d320a80bd5e4f23b3de7d1f'
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `/weathermapapi/data/2.5/forecast?lat=${route.params.lat}&lon=${route.params.lon}&appid=${APIKey}&units=metric`
        )
        await new Promise((res) => setTimeout(res, 1000))
        const offsetSeconds = weatherData.data.city.timezone
        const currentDate = new Date()
        const adjustedDate = new Date(
            currentDate.getTime() + offsetSeconds * 1000
        )
        weatherData.data.current = adjustedDate
        // weatherData.data.hourly.forEach((hour) => {
        //     const utc = hour.dt * 1000 + localoffset;
        //     hour.currentTime = utc + 1000 * weatherData.data. timezone_offset;
        // });
        return weatherData
    } catch (err) {
        console.log(err)
    }
}
const weatherData = await getWeatherData()
</script>
