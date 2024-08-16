<template>

    <div class="w-full">
        <div class="swiper">
            <div class="swiper-wrapper">
            <div v-for="image in images" class="swiper-slide  aspect-square overflow-hidden rounded-xl ">
                <img class="w-full h-full object-cover" :src="image" alt="product image"/>
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
    'https://tarpit.twic.pics/ghostfriend/book7.jpg?twic=v1/resize=400&focus=auto',
    'https://tarpit.twic.pics/ghostfriend/img/new_book.jpg?twic=v1/resize=400&focus=auto',
    'https://tarpit.twic.pics/ghostfriend/img/book_7_end.jpg?twic=v1/resize=400&focus=auto'
])

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

onMounted(() => {
    const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 1000,
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