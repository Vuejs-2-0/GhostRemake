<script setup>
import { toRefs } from 'vue';
import Summary from "../components/CheckoutDialog/Summary.vue";

const props = defineProps(["tx"]);
const { tx:txs } = toRefs(props);

let status_map = {
        'paid': {
            'title': '付款成功',
            'emoji': '🎉',
            'description': '您的付款已成功处理，我们将尽快处理您的订单。'
        },
        'rejected': {
            'title': '付款失败',
            'emoji': '😢',
            'description': '您的付款未能成功处理，请您再次尝试。'
        },
        'pending': {
            'title': '付款处理中',
            'emoji': '⏳',
            'description': '您的付款正在处理中。'
        },
        'canceled': {
            'title': '订单取消',
            'emoji': '🚫',
            'description': '您的订单已取消。'
        },
        'to_verify':{
            'title': '待验证',
            'emoji': '🔍',
            'description': '管理员正在验证您的订单，您可以稍后到「我的订单」页面查看订单状态。'
        }
    }

    const computedStatus = (tx) => {
        if(!tx) return;
        return status_map[tx?.status];
    }

    const paymentPage = (tx_uuid) => {
        console.log(tx_uuid);
        if (typeof window !== 'undefined') {
            // This code will only run in the browser
            window.location.href = `/pay?tx=${tx_uuid}`;
        }
    }

</script>

<template>
    <div class="w-full flex justify-center items-center ">
        <div class="w-full space-y-4">
            <article v-for="tx in txs" class="w-full flex justify-center items-center flex-col border-b-2 border-b-salmon-100 py-8">
                <div class="w-full max-w-sm p-4">
                    <div class=" flex justify-start items-center space-x-2">
                        <div class="text-2xl mt-2">{{ computedStatus(tx)?.emoji }}</div>
                        <div class="font-bold text-2xl">{{ computedStatus(tx)?.title }}</div>
                    </div>
                    <p>{{ computedStatus(tx)?.description }}</p>
                </div>
                <div class="w-full max-w-sm bg-white p-4 rounded-xl ">
                    <button @click="paymentPage(tx.uuid)">Direct to payment page</button>
                    <Summary :postageEntry="tx.entries.filter((entry) => entry.type === 'postage')" :productEntries="tx.entries.filter((entry) => entry.type == 'product')" :form="tx.form" :value="tx.value"></Summary>
                </div>
            </article> 
        </div>
    </div>
</template>