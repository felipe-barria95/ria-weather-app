<template>
    <Suspense>
        <AsyncCityView />
        <template #fallback>
            <CityViewSkeleton />
        </template>
    </Suspense>
</template>

<script setup>
    import CityViewSkeleton from './CityViewSkeleton.vue';
    import AsyncCityView from './AsyncCityView.vue';

</script>
