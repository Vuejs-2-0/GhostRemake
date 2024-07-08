<template>

    <div class="w-full flex flex-col justify-start items-center pb-8">

        <div class="w-full max-w-sm bg-white p-4 rounded-xl shadow-xl flex justify-center items-center">

            <template v-if="busy">

                <iconify-icon  class="text-7xl text-salmon" icon="eos-icons:three-dots-loading"></iconify-icon>

            </template>
            <template v-else>

               <div class="w-full flex justify-center items-center ">

                <div class="w-full">
                    <h1 class="font-bold">{{ computedStatus?.title }}</h1>
                    <p>{{ computedStatus?.description }}</p>
                </div>

                <div :class="[showRefresh?'ml-2 w-16 ':'w-0 h-0','overflow-hidden']" class="flex justify-center items-center flex-col">
                    <button class="w-12 h-12 rounded-full hover:bg-salmon-100 flex justify-center items-center duration-200" @click="fetchStatus">

                        <iconify-icon class="text-salmon text-3xl" icon="material-symbols:refresh"></iconify-icon>

                    </button>

                    <div class="text-sm">{{ counter }}</div>

                </div>

               </div>
            </template>


        </div>

<!--
        <!~~ <p>Submission complete.</p> ~~>
        <!~~ <p>tx: {{ tx_data?.uuid }}</p> ~~>
        <!~~ <p>type: {{ tx_data?.payment_type }}</p> ~~>

        <br>
        <br>

        <p v-if="busy">Loading...</p>
        <p v-else-if="tx_data">Status: {{ tx_data?.status }}</p>

        <br>
        <br>

        <!~~ <div>
            {{ tx_data?.form }}
        </div> ~~>

        <br>
        <br>

        <template v-if="tx_data?.payment_type == 'stripe' ">

            <template v-if="!(tx_data?.status =='paid' || tx_data?.status == 'rejected')">
                
                <h1>Refresh in {{ counter }}</h1>
                <button class="outline" @click="fetchStatus">Refresh</button>
            </template>

        </template>-->

    </div>

</template>

<script setup>
    
    import { onMounted, ref, computed } from 'vue';

    const props = defineProps(['tx']);
    const tx_data = ref(null);
    const counter = ref(10);
    const busy = ref(false);

    let timer = null;

    const fetchStatus = async () => {
        busy.value = true;
        const response = await fetch(`/api/tx.json?tx=${props.tx}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        tx_data.value = data;
        busy.value = false;
    }

    const startTimer =  () => {
        timer = setInterval( async () => {
            counter.value--;

            if(counter.value === 0){

                if(((tx_data.value?.status == 'paid' || tx_data.value?.status == 'rejected'))) {
                    counter.value = 0;
                    clearInterval(timer);
                    return;
                }else {
                    clearInterval(timer);
                    await fetchStatus();
                    counter.value = 10;
                    startTimer();
                }

            }
        }, 1000);
    }

    onMounted( async () => {

        await fetchStatus()

        if(tx_data.value?.payment_type == 'stripe' && !(tx_data.value?.status == 'paid' || tx_data.value?.status == 'rejected')){
            startTimer();
            
            counter.value = 10;
        }
    })

    let status_map = {
        'paid': {
            'title': '付款成功',
            'description': '您的付款已成功处理，我们将尽快处理您的订单。'
        },
        'rejected': {
            'title': '付款失败',
            'description': '您的付款未能成功处理，请您再次尝试。'
        },
        'pending': {
            'title': '付款处理中',
            'description': '您的付款正在处理中。'
        },
        'canceled': {
            'title': '订单取消',
            'description': '您的订单已取消。'
        },
        'to_verify':{
            'title': '待验证',
            'description': '管理员正在验证您的订单，您可以稍后到「我的订单」页面查看订单状态。'
        }
    }

    const computedStatus = computed(() => {

        if(!tx_data.value) return;

        console.log(tx_data.value?.status)
        
        return status_map[tx_data.value?.status];
        
    })

    const showRefresh = computed(() => {
        return tx_data.value?.payment_type == 'stripe' && !(tx_data.value?.status == 'paid' || tx_data.value?.status == 'rejected');
    })

</script>