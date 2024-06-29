<template>

    <div>stripe</div>

    <div v-if="busy">loading...</div>

    <!--<div>
        <div id="payment-element"></div>
    </div>-->

    <form @submit.prevent="submitStripe()" id="payment-form">
                                <div  id="payment-element"></div>
                              

                                <div class="w-full flex justify-end items-center pt-8">
                                  <Button :disabled="stripeBusy" type="submit" class=" w-full flex justify-center items-center sm:w-auto disabled:opacity-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <iconify-icon   v-if="stripeBusy" class="text-indigo-200 text-2xl mr-2" icon="svg-spinners:180-ring"></iconify-icon>
                                    <!-- <Icon v-if="stripeBusy" class="text-indigo-200 text-2xl mr-2" name="svg-spinners:180-ring"></Icon> -->
                                    <span  v-if="!stripeBusy">完成订单</span>
                                    <span  v-if="stripeBusy">Please Wait...</span>

                                    </Button>
                                </div>


                                <div id="payment-message" class="hidden"></div>
                            </form>

</template>

<script setup>

import 'iconify-icon';

import { Button } from "@/components/ui/button";
import { toRefs, defineProps, onMounted, ref } from 'vue'

import {loadStripe} from '@stripe/stripe-js';
import { stripe_pk, prodMode} from '@/constants';

const props = defineProps(['tx'])
const { tx } = toRefs(props)

const stripe  = ref(null)
const elements = ref(null)

const busy  = ref(true)
const stripeBusy = ref(false)

// const stripe = await loadStripe(stripe_pk);

onMounted(async () => {
    console.log(tx.value)
    stripe.value = await loadStripe(stripe_pk);


    let _value = tx.value.value
    // round _value to exactly 2 decimal places, then multiply by 100
    // so that 12.34 becomes 1234

    _value = parseInt(_value.toFixed(2) * 100)
    
    

    let response = await fetch('/api/stripe_pi.json', {
        method: 'POST',
        body: JSON.stringify({
            amount: _value,
            currency: 'myr',
            prodMode: prodMode,
            metadata: {
                tx_uuid: tx.value.uuid
            }
        })
    })

    response = await response.json()
    // console.log(response)

    let client_secret = response.payment_intent.client_secret

    elements.value = stripe.value.elements({
        clientSecret: client_secret
    });

    const paymentElement = elements.value.create("payment");
    paymentElement.mount("#payment-element");

    // elements.value = stripe.value.elements();
})

const submitStripe = async () => {

    // PUT because we are actually updating the transaction
    

    stripeBusy.value = true;

    let _result = await fetch('/api/tx.json', {
        method: 'PUT',
        body: JSON.stringify({
            uuid: tx.value.uuid,
            paymentType: 'stripe'
        })
    })

    console.log(_result)

    const result = await stripe.value.confirmPayment({
        elements:elements.value,
        confirmParams: {
            // Make sure to change this to your payment completion page
        //   return_url: "http://localhost:4242/checkout.html",
        return_url: `${window.location.origin}/complete?tx=${tx.value.uuid}`
        },
    });

    stripeBusy.value = false;

    console.log(result)

}

</script>