<template>

    <div>

        <p class="mb-8 font-bold">Item Subtotal: {{ item_subtotal }}</p>

        <Form client:only="vue"  :json_schema="json_schema" :field_config="field_config" @submit="computeTx" />
    </div>

</template>

<script setup>

    import { toRefs, computed } from 'vue'
    import Form from "@/components/Checkout/Form.vue"

    const props = defineProps(["json_schema","field_config","products","cart"])
    const { json_schema, field_config, products, cart } = toRefs(props)

    const item_subtotal = computed( () => {

        let total = 0

        products.value.forEach( product => {
            total += product.price * product.quantity
        })

        return total

    })

    const computeTx = async (ev) => {
        const formData = ev
        // console.log(formData)

        let dry_run_result = await fetch('/api/tx.json', {
            method: 'POST',
            body: JSON.stringify({
                form: formData,
                cartId: cart.value.id,
                dry_run: true
            })
        })

        dry_run_result = await dry_run_result.json()

        console.log(dry_run_result)



        // alert('Form submitted')
    }

</script>