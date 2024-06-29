<template>
  <div class="w-full">
    <template v-if="page == 1">
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

const _updateCart = async () => {
  const { values, valid } = await form.validate();
  if (!valid) {
    return;
  }

  const productId = "9";
  let _new_qty = 1 + quantity.value;

  let newBracelet = {
    effect: values.效果,
    size: values.size,
    comment: values.comments,
  };

  // Access and update the cart's metadata
  let cartMetadata = { ...$cart.value.metadata };
  console.log(cartMetadata);
  
  // Clone the existing bracelets array to avoid modifying the original reference
  let existingBracelets = [...(user_cart.value.metadata?.bracelets || [])];
  console.log(existingBracelets);

  // Add the new bracelet to the cloned array
  existingBracelets.push(newBracelet);
  console.log("Latest: ", existingBracelets);

  cartMetadata.bracelets = existingBracelets;
  console.log()

  await updateProductBraceletInCart(productId, _new_qty, cartMetadata);
};
</script>