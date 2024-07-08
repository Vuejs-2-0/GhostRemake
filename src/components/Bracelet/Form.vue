<template>
  <div class="w-full">
    <template v-if="page == 1">
      <div class="space-y-4 pb-5">
        <p>效果 <span class="text-red-500">*</span> </p>
        <div v-for="(effect, index) in effectsOptions" :key="index" class="flex items-center space-x-2">
          <input
            type="checkbox"
            :id="`effect-${index}`"
            :value="effect"
            v-model="selectedEffects"
            class="hidden peer"
          />
          <label
            :for="`effect-${index}`"
            class="flex items-center justify-center w-4 h-4 border-2 border-gray-300 rounded-md cursor-pointer peer-checked:bg-salmon-500 peer-checked:border-salmon-500"
          >
            <svg v-if="selectedEffects.includes(effect)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </label>
          <label :for="`effect-${index}`" class="cursor-pointer text-sm">{{ effect }}</label>
        </div>
        <p v-if="effectError" class="text-red-500 text-sm">请选择至少一个效果。</p>
      </div>
      <AutoForm
        class="w-full space-y-6 mb-8"
        :form="form"
        :schema="schema"
        :field-config="field_config"
        @submit="_updateCart"
      ></AutoForm>
      <Button
        @click="_updateCart"
        class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3"
      >
        <span class="text-xl text-white">加入购物车 </span>
      </Button>
    </template>
  </div>
</template>

<script setup>
import { toRefs, ref, computed, defineProps, defineEmits } from "vue";
import * as z from "zod";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { jsonSchemaToZod } from "json-schema-to-zod";
import { cart, updateProductBraceletInCart } from "@/stores/cart";
import { useStore } from "@nanostores/vue";

const $cart = useStore(cart);
const props = defineProps(["user_cart", "json_schema", "field_config"]);
const emits = defineEmits(["submit"]);
const { user_cart, json_schema, field_config } = toRefs(props);

const schema = eval(jsonSchemaToZod(json_schema.value));

const page = ref(1);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const quantity = computed(() => {
  if ($cart.value?.items) {
    let _item = $cart.value?.items["9"];
    if (_item) {
      return _item;
    }
    return 0;
  }
  return 0;
});

// Define effects options
const effectsOptions = ref(["防小人", "挡煞", "招桃花", "招财"]);

// Selected effects state
const selectedEffects = ref([]);

// Effect error state
const effectError = ref(false);

const _updateCart = async () => {
  const { values, valid } = await form.validate();
  if (!valid) {
    return;
  }

  if (selectedEffects.value.length === 0) {
    effectError.value = true;
    return;
  } else {
    effectError.value = false;
  }

  const productId = "9";
  let _new_qty = 1 + quantity.value;

  let newBracelet = {
    effect: selectedEffects.value,  // Store selected effects here
    size: values.size,
    comment: values.comments,
  };

  // Access and update the cart's metadata
  let cartMetadata = { ...$cart.value.metadata };
  
  // Clone the existing bracelets array to avoid modifying the original reference
  let existingBracelets = [...(user_cart.value.metadata?.bracelets || [])];

  // Add the new bracelet to the cloned array
  existingBracelets.push(newBracelet);

  cartMetadata.bracelets = existingBracelets;

  await updateProductBraceletInCart(productId, _new_qty, cartMetadata);
  // Refresh page
  window.location.reload();
};
</script>