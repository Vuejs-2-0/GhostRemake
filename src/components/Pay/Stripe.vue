<template>
  <!-- <div>stripe</div> -->

  <div :class="[busy ? 'max-h-[300px]' : 'max-h-0', 'duration-500 overflow-hidden']">
    <div class="flex justify-center items-center flex-col py-12">
      <iconify-icon class="text-5xl text-salmon-500 mb-2 animate-bounce" icon="ion:card"></iconify-icon>
      <p class="text-salmon-500 text-lg">Stripe 正在初始化，请稍后</p>
    </div>
  </div>

  <div :class="[!busy ? 'max-h-[600px] p-2' : 'max-h-0', 'duration-300 delay-200 overflow-hidden']">
    <form @submit.prevent="submitStripe()" id="payment-form">
      <div id="payment-element"></div>

      <div class="w-full flex justify-end items-center py-8">
        <!--<Button :disabled="stripeBusy" type="submit" class=" w-full flex justify-center items-center sm:w-auto disabled:opacity-50 rounded-xl bg-salmon-500 px-6 py-4 text-xl font-semibold text-white shadow hover:bg-salmon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salmon-600">
                                    <iconify-icon   v-if="stripeBusy" class="text-indigo-200 text-2xl mr-2" icon="svg-spinners:180-ring"></iconify-icon>
                                    <!~~ <Icon v-if="stripeBusy" class="text-indigo-200 text-2xl mr-2" name="svg-spinners:180-ring"></Icon> ~~>
                                    <span  v-if="!stripeBusy">付款</span>
                                    <span  v-if="stripeBusy">Please Wait...</span>

                                    </Button>-->

        <Button type="submit" :disabled="stripeBusy" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3 w-full mt-4">
          <span v-if="!stripeBusy" class="text-xl text-white">付款</span>
          <div class="flex justify-center items-center space-x-2" v-if="stripeBusy">
            <iconify-icon class="text-3xl text-white" icon="eos-icons:three-dots-loading"></iconify-icon>
            <div>请稍候...</div>
          </div>
        </Button>
      </div>

      <div id="payment-message" class="hidden"></div>
    </form>
  </div>

  <!--<div>
        <div id="payment-element"></div>
    </div>-->
</template>

<script setup>
import "iconify-icon";

import { Button } from "@/components/ui/button";
import { toRefs, defineProps, onMounted, ref } from "vue";

import { loadStripe } from "@stripe/stripe-js";
import { stripe_pk, prodMode } from "@/constants";

const props = defineProps(["tx"]);
const { tx } = toRefs(props);

const stripe = ref(null);
const elements = ref(null);

const busy = ref(true);
const stripeBusy = ref(false);

// const stripe = await loadStripe(stripe_pk);

onMounted(async () => {
  console.log(tx.value);
  stripe.value = await loadStripe(stripe_pk);

  let _value = tx.value.value;
  // round _value to exactly 2 decimal places, then multiply by 100
  // so that 12.34 becomes 1234

  _value = parseInt(_value.toFixed(2) * 100);

  let response = await fetch("/api/stripe_pi.json", {
    method: "POST",
    body: JSON.stringify({
      amount: _value,
      currency: "myr",
      prodMode: prodMode,
      metadata: {
        tx_uuid: tx.value.uuid,
      },
    }),
  });

  response = await response.json();
  // console.log(response)

  let client_secret = response.payment_intent.client_secret;

  elements.value = stripe.value.elements({
    clientSecret: client_secret,
  });

  const paymentElement = elements.value.create("payment");
  paymentElement.mount("#payment-element");

  busy.value = false;

  // elements.value = stripe.value.elements();
});

const submitStripe = async () => {
  // PUT because we are actually updating the transaction

  stripeBusy.value = true;

  let _result = await fetch("/api/tx.json", {
    method: "PUT",
    body: JSON.stringify({
      uuid: tx.value.uuid,
      paymentType: "stripe",
    }),
  });

  console.log(_result);

  const result = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      // Make sure to change this to your payment completion page
      //   return_url: "http://localhost:4242/checkout.html",
      return_url: `${window.location.origin}/complete?tx=${tx.value.uuid}`,
    },
  });

  stripeBusy.value = false;

  console.log(result);
};
</script>
