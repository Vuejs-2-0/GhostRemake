<script setup>
import { ref, toRefs } from 'vue';
import Summary from "../components/CheckoutDialog/Summary.vue";

const props = defineProps(["tx"]);
const { tx } = toRefs(props);
</script>

<template>
    <div v-for="(id) in tx" :key="id">
        <div class="w-full max-w-sm py-4 flex justify-between items-center">
        
            <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
            
                <div class="w-full mt-2 ml-2 mb-2">
        
                    <Summary :postageEntry="tx.entries.filter((entry: any) => entry.type === 'postage')" :productEntries="tx.entries.filter((entry: any) => entry.type == 'product')" :form="tx.form" :value="tx.value"></Summary>

                </div>
        
            </article> 
    
        </div>
    </div>
</template>