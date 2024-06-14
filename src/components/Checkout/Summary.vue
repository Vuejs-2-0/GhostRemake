<template>

    <div>

        <h1 class="py-8 font-bold">Summary</h1>

        <div class="grid grid-cols-3" v-for="entry in product_entries">
            <img class="w-12 h-12" :src="entry.metadata.product.media.image">
            <p>{{ entry.metadata.label }}</p>
            <p>RM {{ entry.value }}</p>
        </div>

        <p>Shipping</p>
        <template v-if="dry_run_result.form.delivery_method == 'postal'">

            <div class="grid grid-cols-2">
                <p>{{ postage_entry.metadata.label }}</p>
                <p>RM {{ postage_entry.value }}</p>
            </div>

        </template>
        <template  v-if="dry_run_result.form.delivery_method == 'self_pickup'">
            <p>Selfpickup</p>
        </template>
        <br>
        <p>Total</p>
        <p>RM {{ dry_run_result.value }}</p>
        
        <Button @click="proceedToPayment()">Proceed to Payment</Button>

    </div>


</template>

<script setup>

    import { toRefs, ref, computed } from 'vue'
    import { Button } from "@/components/ui/button";

    const emit = defineEmits(["submit"])

    const props = defineProps(["dry_run_result"])

    const { dry_run_result } = toRefs(props)

    const product_entries = computed( () => dry_run_result.value.entries.filter( entry => entry.type === "product" ) )

    const postage_entry = computed( () => dry_run_result.value.entries.find( entry => entry.type === "postage" ) )

    const proceedToPayment = () => {
        // console.log("Proceed to payment")
        emit("submit")
    }

</script>