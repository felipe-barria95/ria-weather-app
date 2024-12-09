<template>
    <div class="flex flex-col flex-1 items-center">
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{ weatherData.data.city.name }}, {{ weatherData.data.city.country }}</h1>
            <p class="text-sm mb-12">
                {{ 
                    new Date(weatherData.data.current).toLocaleDateString(
                        "en-us",
                        {
                            weekday: "short", 
                            day: "2-digit",
                            month: "long",
                        },
                    )
                }}
                {{ 
                    new Date(weatherData.data.current).toLocaleTimeString(
                        "en-us",
                        {
                            timeStyle: "short",
                        },
                    )
                }}
            </p>
            <p class="text-8xl mb-8">{{ Math.round(weatherData.data.list[0].main.temp) }}&deg; C</p>
            <p>Feels like {{ Math.round(weatherData.data.list[0].main.feels_like) }}&deg; C</p>
            <p class="capitalize">{{ weatherData.data.list[0].weather[0].description }}</p>
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
                        v-for="hourData in weatherData.data.list.slice(0, 7)"
                        :key="hourData.dt"
                        class="flex flex-col gap-4 items-center"
                    >
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(hourData.dt * 1000).toLocaleTimeString("en-US", {
                                    hour: "numeric"
                                })
                            }}
                        </p>
                        <img
                            class="w-auto h-[50px] object-cover"
                            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                            alt=""
                        />
                        <p class="text-xl">
                            {{ Math.round(hourData.main.temp) }}&deg; C
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    console.log(route.params.lat, route.params.lon);
    const APIKey = "482944e26d320a80bd5e4f23b3de7d1f";
    const getWeatherData = async () => {
        try {
            const weatherData = await axios.get(`/weathermapapi/data/2.5/forecast?lat=-22.90278&lon=-43.2075&appid=${APIKey}&units=metric`);
            const offsetSeconds = weatherData.data.city.timezone;
            const currentDate = new Date();
            const adjustedDate = new Date(currentDate.getTime() + offsetSeconds * 1000);
            weatherData.data.current = adjustedDate;
            // weatherData.data.hourly.forEach((hour) => {
            //     const utc = hour.dt * 1000 + localoffset;
            //     hour.currentTime = utc + 1000 * weatherData.data. timezone_offset;
            // });
            return weatherData;
        } catch (err) {
            console.log(err);
        }
    };
    const weatherData = await getWeatherData();
    console.log(weatherData);
</script>
