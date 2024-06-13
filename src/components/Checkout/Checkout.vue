<template>

    <div>

        <p class="mb-8 font-bold">Item Subtotal: {{ item_subtotal }}</p>

        <Form client:only="vue"  :json_schema="json_schema" :field_config="field_config" @submit="computeTx" />
    </div>

</template>

<script setup>

    import { toRefs, computed } from 'vue'
    import Form from "@/components/Checkout/Form.vue"

    const props = defineProps(["json_schema","field_config","products"])
    const { json_schema, field_config, products} = toRefs(props)

    const item_subtotal = computed( () => {

        let total = 0

        products.value.forEach( product => {
            total += product.price * product.quantity
        })

        return total

    })

    const computeTx = (ev) => {
        const formData = ev
        console.log(formData)
        // alert('Form submitted')
    }

</script>