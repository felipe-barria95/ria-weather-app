<template>
    <main class="container text-white">
        <div class="pt-4 mb-8">
            <input
                type="text"
                v-model="searchQuery"
                @input="getSearchResults"
                placeholder="Search for a city or country"
                class="py-2 px-1 w-full bg-transparent border-b border-white focus: outline-none focus: shadow-[Opx_1px_0_0_#004E71]"
            />
            <ul
                class="bg-white text-weather-secondary w-full shadow-md py-2 px-1"
                v-if="mapboxSearchResults"
            >
                <p v-if="searchError">
                    Error while fetching data. Please try again
                </p>
                <p v-if="!serverErron && mapboxSearchResults.length === 0">
                    No results matched
                </p>
                <template v-else>
                    <li
                        v-for="searchResult in mapboxSearchResults"
                        class="py-2 cursor-pointer"
                        @click="previewCity(searchResult.lat, searchResult.lon)"
                        :key="searchResult.id"
                    >
                        {{ searchResult.cityName }}, {{ searchResult.country }}
                    </li>
                </template>
            </ul>
        </div>
        <CityList />
    </main>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CityList from '@/components/CityList.vue'

const router = useRouter()
const result = ref(null);
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value != '') {
            try {
                if (!result.value) {
                    result.value = await axios.get(
                        '/weatherbitapi/static/exports/cities_20000.csv'
                    )
                }
                const CSVResultArray = result.value.data.split('\n')
                const filteredResults = CSVResultArray.filter((row) =>
                    row.toLowerCase().includes(searchQuery.value.toLowerCase())
                ).slice(0, 10)
                const parsedResults = filteredResults.map((res) => {
                    const sep = res.split(',')
                    return {
                        id: sep[0],
                        cityName: sep[1],
                        country: sep[4],
                        lat: sep[5],
                        lon: sep[6],
                    }
                })
                mapboxSearchResults.value = parsedResults
            } catch {
                searchError.value = true
            }
            return
        }
        mapboxSearchResults.value = null
    }, 500)
}

const previewCity = (lat, lon) => {
    searchQuery.value = ''
    mapboxSearchResults.value = null
    router.push({
        name: 'cityView',
        params: { lat, lon },
    })
}
</script>
