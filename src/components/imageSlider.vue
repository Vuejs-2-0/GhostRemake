<template>

    <div class="w-full">
        <div class="swiper">
            <div class="swiper-wrapper">
            <div v-for="image in images" class="swiper-slide  aspect-square overflow-hidden ">
                <img class="w-full h-full object-cover" :src="image" alt="">
            </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>

</template>

<script setup>

import { onMounted, toRefs, ref } from 'vue';

// const props = defineProps({
//     images: Array,
//     options: Object
// })

// const { images, options } = toRefs(props)

const images = ref([
    '/img/bracelet/bracelet1.jpg',
    '/img/bracelet/bracelet2.jpg',
    '/img/bracelet/bracelet3.jpg',
    '/img/bracelet/bracelet4.jpg',
])

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

onMounted(() => {
    const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 2000,
    },

    pagination: {
        el: ".swiper-pagination",
      },

    });
})

// // init Swiper:
// const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
  
// });

</script>


<style>
.swiper-pagination-bullet-active {
    background-color: #ffffff!important;
}
</style>