<template>
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

onMounted(async () => {
  stripe.value = await loadStripe(stripe_pk);

  let _value = tx.value.value;

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

  let client_secret = response.payment_intent.client_secret;

  elements.value = stripe.value.elements({
    clientSecret: client_secret,
  });

  const paymentElement = elements.value.create("payment");
  paymentElement.mount("#payment-element");

  busy.value = false;
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

  const result = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: `${window.location.origin}/complete?tx=${tx.value.uuid}`,
    },
  });

  stripeBusy.value = false;
};
</script>
