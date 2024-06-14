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

    const dry_run_result = ref({ "dry_run": true, "entries": [ { "entryId": 1, "metadata": { "label": "1 x 真的友鬼6", "product": { "id": 1, "name": "真的友鬼6", "media": { "image": "https://s3.tarpit.app/product/6JFwIDOFFnFbVvy7xgLGDaQEgYcS3r9l.jpeg" }, "price": 25, "status": "active", "metadata": null, "quantity": 1 }, "quantity": 1, "price": 25 }, "type": "product", "value": 25 }, { "entryId": 2, "metadata": { "label": "2 x 真的友鬼1", "product": { "id": 2, "name": "真的友鬼1", "media": { "image": "https://s3.tarpit.app/product/l-9wsfGvK4gOMD8bWHYBpUzcvwFKQAmV.jpeg" }, "price": 25, "status": "unavailable", "metadata": null, "quantity": 2 }, "quantity": 2, "price": 25 }, "type": "product", "value": 50 }, { "entryId": "postage", "metadata": { "label": "Postage cost (West Malaysia)", "atomic_shipping_type": { "label": "West Malaysia", "value": 10 }, "total_postage_cost": 10 }, "type": "postage", "value": 10 } ], "form": { "chineseName": "123", "englishName": "234", "phoneNumber": "345", "delivery_method": "postal", "address": "9, Lrg Galing, Galing, 25300 Kuantan, Pahang, Malaysia", "metadata": { "address_metadata": { "address_components": [ { "long_name": "9", "short_name": "9", "types": [ "street_number" ] }, { "long_name": "Lorong Galing", "short_name": "Lrg Galing", "types": [ "route" ] }, { "long_name": "Galing", "short_name": "Galing", "types": [ "political", "sublocality", "sublocality_level_1" ] }, { "long_name": "Kuantan", "short_name": "Kuantan", "types": [ "locality", "political" ] }, { "long_name": "Pahang", "short_name": "Pahang", "types": [ "administrative_area_level_1", "political" ] }, { "long_name": "Malaysia", "short_name": "MY", "types": [ "country", "political" ] }, { "long_name": "25300", "short_name": "25300", "types": [ "postal_code" ] } ], "entrances": [], "formatted_address": "9, Lrg Galing, Galing, 25300 Kuantan, Pahang, Malaysia", "geometry": { "location": { "lat": 3.8355782, "lng": 103.3291175 }, "location_type": "RANGE_INTERPOLATED", "viewport": { "northeast": { "lat": 3.836927180291502, "lng": 103.3304664802915 }, "southwest": { "lat": 3.834229219708498, "lng": 103.3277685197085 } } }, "place_id": "EjY5LCBMcmcgR2FsaW5nLCBHYWxpbmcsIDI1MzAwIEt1YW50YW4sIFBhaGFuZywgTWFsYXlzaWEiMBIuChQKEgnrxOAR5LrIMRHnxwXc77UcSBAJKhQKEgm9ha0W5LrIMRFAy-r2umWlWQ", "types": [ "street_address" ] } } }, "metadata": { "cartId": "cart_FpjCqgpJJm", "created_at": "2024-06-13T23:09:29.440Z" }, "payment_type": "", "status": "pending", "ownerId": "guest_llsumjfb32wo4fei7oh6vmcguq", "value": 85 })

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