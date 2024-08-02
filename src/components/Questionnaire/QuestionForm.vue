<template>
  <div class="w-full">
    <template v-if="page == 1">
      <div class="space-y-4 pb-5">
        <label
          for="numberOfQuestions"
          class="block text-sm font-medium text-gray-700"
          >选择问题数量</label
        >
        <select
          id="numberOfQuestions"
          v-model="numberOfQuestions"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-salmon-500 focus:border-salmon-500 sm:text-sm rounded-md"
        >
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
        <div v-for="n in generatedQuestions" :key="n" class="space-y-4">
          <label
            :for="`question-${n}`"
            class="block text-sm font-medium text-gray-700"
            >问题 {{ n }}</label
          >
          <input
            type="text"
            :id="`question-${n}`"
            v-model="questions[n - 1]"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-salmon-500 focus:border-salmon-500 sm:text-sm rounded-md"
          />
        </div>
      </div>
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const $cart = useStore(cart);
const props = defineProps(["user_cart", "json_schema", "field_config"]);
const emits = defineEmits(["submit"]);
const { user_cart, json_schema, field_config } = toRefs(props);

const schema = eval(jsonSchemaToZod(json_schema.value));

const page = ref(1);
const numberOfQuestions = ref(1);
const questions = ref([]);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const quantity = computed(() => {
  if ($cart.value?.items) {
    let _item = $cart.value?.items["10"];
    if (_item) {
      return _item;
    }
    return 0;
  }
  return 0;
});

// Ensure the questions array has the correct length
const generatedQuestions = computed(() => {
  return Array.from({ length: numberOfQuestions.value }, (_, index) => questions.value[index] || '');
});

const _updateCart = async () => {
  const { values, valid } = await form.validate();
  if (!valid) {
    return;
  }

  const productId = "9";
  let _new_qty = 1 + quantity.value;

  // Access and update the cart's metadata
  let cartMetadata = { ...$cart.value.metadata };

  // Clone the existing bracelets array to avoid modifying the original reference
  let existingBracelets = [...(user_cart.value.metadata?.bracelets || [])];

  // Add the new bracelet to the cloned array
  existingBracelets.push(newBracelet);

  cartMetadata.bracelets = existingBracelets;

  await updateProductBraceletInCart(productId, _new_qty, cartMetadata);

  // Add an alert before reload page
  alert("加入购物车成功！");

  // Refresh page
  window.location.reload();
};
</script>
