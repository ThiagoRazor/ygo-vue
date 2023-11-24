<template>
    <router-link :to="`/card/${card.id}`" class="inline-block px-3">
        <div class=" w-36 max-w-xs overflow-hidden rounded-lg">
              <div >
                <img class="object-center object-cover" :src="`${card.img}`" :alt="`${card.card}`">
                <p class="text-gray-100 text-center font-semibold">Rate: {{ card.rate.toFixed(2) }}%</p>
              </div>
        </div>
    </router-link>
</template>

<script>
    export default {
            props: {
                card: {
                    type: Object,
                    required: true,
                }
            }
    }
</script>