<template>
  <div class="w-full">
    <template v-if="page == 1">
      <div class="space-y-4 pb-5">
        <fieldset>
          <legend class="text-sm font-semibold text-gray-900">选择类型</legend>
          <div class="mt-3 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
            <label
              v-for="opt in braceletTypeOptions"
              :key="opt.id"
              class="group relative flex rounded-lg bg-white p-4 cursor-pointer"
              :class="braceletType === opt.id ? 'border-2 border-salmon-500 ring-2 ring-salmon-500 bg-salmon-50' : 'border border-gray-300'"
            >
              <input type="radio" name="bracelet-type" class="absolute inset-0 appearance-none focus:outline-none" :value="opt.id" v-model="braceletType" />
              <div class="flex-1">
                <span class="block text-sm font-medium text-gray-900">{{ opt.title }}</span>
                <span class="mt-1 block text-xs text-gray-500">{{ opt.description }}</span>
                <span class="mt-3 block text-sm font-medium text-gray-900">{{ opt.price }}</span>
              </div>
            </label>
          </div>
        </fieldset>
      </div>
      <div v-if="braceletType === 'normal'" class="space-y-4 pb-5">
        <p>效果</p>
        <div v-for="(effect, index) in effectsOptions" :key="index" class="flex items-start space-x-2">
          <input
            type="checkbox"
            :id="`effect-${index}`"
            :value="effect.label"
            v-model="selectedEffects"
            class="hidden peer"
          />
          <label
            :for="`effect-${index}`"
            class="flex items-center justify-center w-4 h-4 mt-0.5 border-2 border-gray-300 rounded-md cursor-pointer peer-checked:bg-salmon-500 peer-checked:border-salmon-500"
          >
            <svg v-if="selectedEffects.includes(effect.label)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </label>
          <label :for="`effect-${index}`" class="cursor-pointer text-sm">
            <div class="font-medium">{{ effect.label }}</div>
            <div class="text-xs text-gray-500">{{ effect.description }}</div>
          </label>
        </div>
      </div>
      <AutoForm
        class="w-full space-y-6 mb-8"
        :form="form"
        :schema="schema"
        :field-config="field_config"
        @submit="_updateCart"
      ></AutoForm>
      <p class="text-sm text-gray-500 -mt-6 mb-6">若不是自己佩戴，请注明佩戴者的名字</p>
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

const braceletTypeOptions = ref([
  { id: 'normal', title: '普通五色绳', description: '常规款，含效果选择', price: 'RM 38/条' },
  { id: 'special', title: '特款五色绳', description: '八字定制，需等待一个月出货', price: 'RM 88/条' },
]);
const braceletType = ref('normal');

const quantity = computed(() => {
  if ($cart.value?.items) {
    const productId = braceletType.value === 'special' ? '12' : '9';
    let _item = $cart.value?.items[productId];
    if (_item) {
      return _item;
    }
    return 0;
  }
  return 0;
});

// Define effects options with secondary captions
const effectsOptions = ref([
  { label: "金榜题名款", description: "适合考试考核 / 成绩飞升" },
  { label: "人见人爱款", description: "适合人缘 / 桃花 / 招好感" },
  { label: "好运连连款", description: "适合开运 / 改运 / 招财富" },
  { label: "出入平安款", description: "适合驾驶者 / 旅行者 / 搬迁人" },
  { label: "心神凝聚款", description: "适合考试紧张 / 精神散乱者" },
]);

// Selected effects state
const selectedEffects = ref([]);

const _updateCart = async () => {
  const { values, valid } = await form.validate();
  if (!valid) {
    return;
  }

  const productId = braceletType.value === 'special' ? '12' : '9';
  let _new_qty = 1 + quantity.value;

  let newBracelet = {
    type: braceletType.value,
    effect: braceletType.value === 'normal' ? selectedEffects.value : [],
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
  
  // Add an alert before reload page
  alert("加入购物车成功！");

  // Refresh page
  window.location.reload();
};
</script>