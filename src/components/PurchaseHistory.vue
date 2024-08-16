<script setup>
import { toRefs } from 'vue';
import Summary from "../components/CheckoutDialog/Summary.vue";
import { Button } from "@/components/ui/button";

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
        'void': {
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
                <div class="flex justify-between items-center w-full max-w-sm p-4">
                    <div class="w-full max-w-sm p-4">
                        <div class=" flex justify-start items-center space-x-2">
                            <div class="text-2xl mt-2">{{ computedStatus(tx)?.emoji }}</div>
                            <div class="font-bold text-2xl">{{ computedStatus(tx)?.title }}</div>
                        </div>
                        <p>{{ computedStatus(tx)?.description }}</p>
                    </div>
                    <div>
                        <Button v-if="tx.status === 'pending'" @click="paymentPage(tx.uuid)" class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-white hover:bg-salmon-500 hover:text-white text-salmon-500 text-lg duration-300">
                            前往付款
                        </Button>
                    </div>
                </div>
                <div class="w-full max-w-sm bg-white p-4 rounded-xl ">
                    
                    <Summary :postageEntry="tx.entries.filter((entry) => entry.type === 'postage')" :productEntries="tx.entries.filter((entry) => entry.type == 'product')" :form="tx.form" :value="tx.value"></Summary>
                </div>
            </article> 
        </div>
    </div>
</template>