<template>
    <div>
        <div class="w-full flex flex-col justify-start items-center">
            <p class="mb-4">订单详情</p>
            <div class="w-full max-w-sm bg-white p-4 rounded-xl shadow-xl">
                <Summary :postageEntry="tx.entries.filter((entry) => entry.type === 'postage')" :productEntries="tx.entries.filter((entry) => entry.type == 'product')" :form="tx.form" :value="tx.value"></Summary>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { toRefs } from 'vue';
    import Summary from "@/components/CheckoutDialog/Summary.vue";

    const props = defineProps(['tx']);
    const { tx } = toRefs(props);
</script>