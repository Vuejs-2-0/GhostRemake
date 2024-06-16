<template>

    <div>

        <p class="mb-8 font-bold">Item Subtotal: {{ item_subtotal }}</p>

        <Form :json_schema="json_schema" :field_config="field_config" @submit="computeTx" />

        <template v-if="dry_run_result" >
            <Summary :dry_run_result="dry_run_result" @submit="submitTx" />  
        </template>

    </div>

</template>

<script setup>

    import { toRefs, computed, ref } from 'vue'
    import Form from "./Form.vue"
    import Summary from './Summary.vue';

    const props = defineProps(["json_schema","field_config","products","cart"])
    const { json_schema, field_config, products, cart } = toRefs(props)

    const dry_run_result = ref(false)


    const item_subtotal = computed( () => {

        let total = 0

        products.value.forEach( product => {
            total += product.price * product.quantity
        })

        return total

    })

    const computeTx = async (ev) => {

        dry_run_result.value = false

        const formData = ev
        // console.log(formData)

        let _dry_run_result = await fetch('/api/tx.json', {
            method: 'POST',
            body: JSON.stringify({
                form: formData,
                cartId: cart.value.id,
                dry_run: true
            })
        })

        dry_run_result.value = await _dry_run_result.json()

        console.log(dry_run_result.value)



        // alert('Form submitted')
    }

    const submitTx = async () => {

        let _submit_result = await fetch('/api/tx.json', {
            method: 'POST',
            body: JSON.stringify({
                form: dry_run_result.value.form,
                cartId: cart.value.id,
                dry_run: false
            }),
            redirect: 'follow'
        })

        if(_submit_result.redirected){
            window.location.href = _submit_result.url
        }

        // let submit_result = await _submit_result.json()

        // console.log(_submit_result)

    }

</script>