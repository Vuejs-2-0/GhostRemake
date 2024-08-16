<template>
    <div class="w-full max-w-sm mt-4">

        <p class="text-center pb-4 text-salmon-300">点击相关查看脸书帖子</p>

        <div class="w-full grid grid-cols-2 gap-2" >
        
            <div v-for="post in posts" class="bg-white rounded-lg aspect-square overflow-hidden flex justify-center items-center hover:ring-4 hover:ring-offset-2 hover:ring-salmon-500 duration-300">
                <div class="w-full rounded-xl overflow-hidden h-full">
                    <iframe :src="post" width="100%" height="100%" style="border:none" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted } from 'vue'

    const posts = ref([])

    onMounted( () => {
        posts.value = [
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmy.ghost.friend%2Fposts%2Fpfbid02Wa1ELhzMrQ9MajfGKMETJJiFp2gmLv94BcaYtc5WutAFF3hzAyQwycDe36xRZDYUl&show_text=true",
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmy.ghost.friend%2Fposts%2Fpfbid02tjqwUvEpUW3sEPHNC2ni9FAB7oNxo4nP3zCEpXtsbgZJHG7AS8ukDRmG9wzxFuDXl&show_text=true",
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmy.ghost.friend%2Fposts%2Fpfbid02iKoadCSTW92DSQnw2pYrHpWu8AZhWK67TKmvxpK75Z72gRi4t4uUxo43QskGQ4t8l&show_text=true",
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmy.ghost.friend%2Fposts%2Fpfbid0L1zY1QzcYLojm4wJLZC8scSkgoyRq4Rz9Vu7BjqPDyJdDj7cmjVqt1ugAHFGaMBYl&show_text=true"
        ]
    })

</script>