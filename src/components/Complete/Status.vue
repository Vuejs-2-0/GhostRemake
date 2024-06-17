<template>

    <div>

        <p>Submission complete.</p>
        <p>tx: {{ tx_data?.uuid }}</p>

        <br>
        <br>

        <p v-if="busy">Loading...</p>
        <p v-else-if="tx_data">Status: {{ tx_data?.status }}</p>

        <br>
        <br>

        <div>
            {{ tx_data?.form }}
        </div>

        <br>
        <br>

        <template v-if="tx_data?.payment_type == 'stripe' ">

            <template v-if="tx_data?.status !='paid'">
                
                <h1>Refresh in {{ counter }}</h1>
                <button class="outline" @click="fetchStatus">Refresh</button>
            </template>

        </template>

    </div>

</template>

<script setup>
    
    import { onMounted, ref } from 'vue';

    const props = defineProps(['tx']);
    const tx_data = ref(null);
    const counter = ref(30);
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

                if((!tx_data.value?.status == 'paid')) {
                    counter.value = 0;
                    clearInterval(timer);
                    return;
                }else {
                    await fetchStatus();
                    counter.value = 30;
                    startTimer();
                }

            }
        }, 1000);
    }

    onMounted( async () => {

        await fetchStatus()

        if(tx_data.value?.payment_type == 'stripe' && tx_data.value?.status !== 'paid'){
            startTimer();
            
            counter.value = 30;
        }
    })

</script>