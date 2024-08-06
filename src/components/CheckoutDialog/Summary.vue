<template>
  <div>
    <div class="w-full grid grid-cols-4 text-center text-sm border-b pb-2 font-bold">
      <p class="text-left pl-1 col-span-2">商品</p>
      <!-- <p>数量</p> -->
      <p>单价</p>
      <p>小计</p>
    </div>

    <div class="w-full">
      <div v-for="entry in productEntries" :key="entry.entry_id" class="w-full grid grid-cols-4 gap-2 mt-4 justify-center items-center text-center">
        <!--- <img :src="product.media.image" alt="Product Image" class="w-full col-span-1 aspect-square bg-white rounded-xl border" /> -->
        <div class="text-left pl-1 col-span-2">
            <p>{{ entry?.metadata?.label }}</p>
            <p class="text-[12px] font-light">{{ entry?.metadata?.bracelets }}</p>
            <button v-if="entry?.metadata?.questionSet" @click="toggleQuestions(entry.entry_id)" class="text-[12px] font-light text-blue-500 underline">
              {{ showQuestions[entry.entry_id] ? '隐藏问题' : '显示问题' }}
            </button>
          <div v-if="showQuestions[entry.entry_id]" class="mt-2">
            <div v-for="(question, qIndex) in entry?.metadata?.questionSet" :key="`${entry.entry_id}-${qIndex}`">
              <p class="text-[12px] font-light">{{ question }}</p>
            </div>
          </div>
        </div>
        <!-- <p class="col-span-1 text-sm">{{ entry?.quantity }}</p> -->
        <p class="col-span-1 text-sm">RM {{ entry?.metadata?.product?.price }}</p>
        <p class="col-span-1 text-sm">RM {{ entry?.value }}</p>
      </div>

      <div v-for="entry in postageEntry" :key="entry?.entry_id" class="w-full grid grid-cols-4 gap-2 mt-4 justify-center items-center text-center">
        <!-- <img :src="product.media.image" alt="Product Image" class="w-full col-span-1 aspect-square bg-white rounded-xl border" /> -->
        <p class="col-span-3 text-left pl-1">{{ entry?.metadata?.label }}</p>
        <!-- <p class="col-span-1 text-sm"></p> -->
        <p class="col-span-1 text-sm">RM {{ entry?.value }}</p>
      </div>
    </div>

    <hr class="my-6 w-full" />

    <div class="w-full">
      <p class="mb-1 font-bold text-sm">配送方式</p>
      <div class="w-full">
        <template v-if="form.delivery_method == 'postal'">
          <p>邮寄</p>
          <p class="text-sm mt-1">地址: {{ form.address }}</p>
        </template>
        <template v-if="form.delivery_method == 'self_pickup'">
          <p>自取</p>
        </template>
      </div>
    </div>

    <hr class="my-6 w-full" />

    <div class="w-full">
      <p class="mb-1 font-bold text-sm">个人资料</p>
      <p>
        中文姓名：
        <span class="text-sm font-light">{{ form.chineseName }}</span>
      </p>
      <p>
        英文姓名：
        <span class="text-sm font-light">{{ form.englishName }}</span>
      </p>
      <p>
        联络号码：
        <span class="text-sm font-light">{{ form.phoneNumber }}</span>
      </p>
      <p>
        电邮地址：
        <span class="text-sm font-light">{{ form.email }}</span>
      </p>
    </div>

    <div v-if="!hide_footer" class="pt-8 w-full">
      <div class="w-full flex justify-between items-center px-2 pt-4 border-t">
        <p class="text-xl">总计</p>
        <p class="text-2xl font-bold">RM {{ Number(value).toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, reactive } from 'vue';

const props = defineProps(['productEntries', 'postageEntry', 'form', 'value', 'hide_footer']);
const { productEntries, postageEntry, form, value, hide_footer } = toRefs(props);

// Reactive state to control the visibility of questions
const showQuestions = reactive({});

// Function to toggle the visibility of questions
function toggleQuestions(entryId) {
  if (showQuestions[entryId] !== undefined) {
    showQuestions[entryId] = !showQuestions[entryId];
  } else {
    showQuestions[entryId] = true;
  }
}
</script>