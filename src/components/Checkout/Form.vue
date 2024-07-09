<template>
  <div class="w-full">
    <template v-if="page == 1">
      <div class="py-12">
        <h1 class="text-2xl font-semibold text-center">请填写资料</h1>
      </div>

      <div class="mb-4">
        <p class="text-sm font-semibold my-1">电邮地址 Email</p>
        <p>{{ userEmail }}</p>
      </div>

      <AutoForm class="w-full space-y-6 mb-8" :form="form" :schema="schema" :field-config="field_config" @submit="submitPage1"></AutoForm>

      <div class="w-full flex justify-between items-center pt-4">
        <div></div>

        <Button @click="submitPage1()" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
          <span class="text-white">下一步</span>
        </Button>
      </div>
    </template>

    <template v-if="page == 2">
      <div>
        <div class="py-12">
          <h1 class="text-2xl font-semibold text-center">请选择配送方式</h1>
        </div>

        <div class="w-full space-y-2">
          <Button @click="selectDeliveryMethod('self_pickup')" :class="[delivery_method == 'self_pickup' ? 'bg-salmon-50' : 'bg-white']" class="w-full border border-gray-200 rounded-md min-h-0 h-auto hover:bg-salmon-50 duration-300 transition-all scale-100 active:scale-95 p-4 group">
            <div class="w-full flex justify-between items-center">
              <p class="text-lg font-semibold text-salmon-500 group-hover:text-salmon-600">自取</p>
              <iconify-icon :class="[delivery_method == 'self_pickup' ? 'scale-100' : 'scale-0']" icon="carbon:checkmark-filled" class="text-xl text-salmon duration-300 overflow-hidden"></iconify-icon>
            </div>
          </Button>

          <Button @click="selectDeliveryMethod('postal')" :class="[delivery_method == 'postal' ? 'bg-salmon-50' : 'bg-white']" class="w-full border border-gray-200 rounded-md min-h-0 h-auto hover:bg-salmon-50 duration-300 transition-all scale-100 active:scale-95 p-4 group">
            <div class="w-full flex justify-between items-center">
              <p class="text-lg font-semibold text-salmon-500 group-hover:text-salmon-600">邮寄</p>
              <iconify-icon :class="[delivery_method == 'postal' ? 'scale-100' : 'scale-0']" icon="carbon:checkmark-filled" class="text-xl text-salmon duration-300 overflow-hidden"></iconify-icon>
            </div>
          </Button>
        </div>

        <div :class="[delivery_method == 'self_pickup' ? 'max-h-[300px]' : 'max-h-0']" class="w-full flex justify-center items-center overflow-hidden duration-500 flex-col">
          <div class="p-4 w-full">
            <div class="w-full text-black">
              <p class="text-left">自取地点:</p>
              <strong>关丹福禄寿殡葬企业（关丹积善堂后方）</strong>
            </div>
            <div class="mt-3 text-sm leading-6 w-full">
              <a href="https://www.facebook.com/flsbcare" class="font-semibold text-salmon-400 underline hover:text-salmon-500 flex justify-start items-center space-x-2 w-full">
                <iconify-icon class="text-lg" icon="akar-icons:facebook-fill"></iconify-icon>
                <div>关丹福禄寿殡葬企业 Facebook</div>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div :class="[delivery_method == 'postal' ? 'max-h-[300px]' : 'max-h-0']" class="overflow-hidden duration-500">
          <p class="mt-8 mb-1 px-2">请输入收件地址</p>

          <div v-if="!showAddressSearch" class="w-full flex justify-between items-center border rounded-md py-2 px-3 space-x-4">
            <div class="flex justify-start items-center space-x-2">
              <iconify-icon icon="carbon:checkmark-filled" class="text-2xl text-salmon"></iconify-icon>
              <p class="text-sm whitespace-break-spaces">{{ addressInput }}</p>
            </div>

            <Button @click="cancelAddressSelection()" variant="outline" class="text-sm min-h-0 h-auto p-1 px-2">取消</Button>
          </div>

          <template v-else>
            <div class="p-1">
              <Input @input="searchAddress" type="text" placeholder="Enter your address..." v-model="addressInput" class="focus-visible:ring-salmon-500" />
            </div>

            <div class="w-full flex justify-start items-center">
              <div class="bg-red-100 text-red-500 p-1.5 px-3 text-sm rounded-xl mt-4" v-if="noAddressResult">未找到地址，请输入完整地址</div>

              <div class="bg-salmon-100 text-salmon-500 p-1.5 px-3 text-sm rounded-xl mt-4" v-if="showAddressOptions">请选择以下地址</div>

              <div class="bg-salmon-100 text-salmon-500 p-1.5 px-3 text-sm rounded-xl mt-4 flex justify-center items-center" v-if="addressSearchBusy">
                <span>搜寻中&nbsp;</span>
                <iconify-icon icon="eos-icons:three-dots-loading" class="text-2xl text-salmon"></iconify-icon>
              </div>
            </div>

            <div v-if="showAddressOptions" class="space-y-2 pt-2">
              <div class="w-full grid grid-cols-12 justify-center items-center py-2 border text-sm rounded-md p-2 px-3" v-for="option in addressOptions">
                <div class="col-span-10 text-left w-full pr-1 whitespace-break-spaces">
                  <p class="">{{ option.formatted_address }}</p>
                </div>
                <div class="col-span-2 flex justify-end items-center pl-4">
                  <Button @click="useAddressOption(option)" class="text-sm bg-salmon-500 hover:bg-salmon-600 min-h-0 h-auto p-1 px-2">确认</Button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="w-full flex justify-between items-center pt-4">
        <Button @click="backPage1()" variant="outline">上一步</Button>

        <Button :disabled="!validPage2" @click="submitPage2()" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
          <span class="text-white">下一步</span>
        </Button>
      </div>
    </template>

    <!--   <div class="py-4">
      <Tabs v-model="delivery_method">
        <TabsList>
          <TabsTrigger value="postal">Postal</TabsTrigger>
          <TabsTrigger value="self_pickup">Self Pickup</TabsTrigger>
        </TabsList>
        <TabsContent value="postal">
          <div>
            <Input @input="searchAddress" type="text" placeholder="Enter your address..." v-model="addressInput" />

            <div v-if="showAddressOptions">
              <p>Search Result:</p>

              <div class="w-full grid grid-cols-12 justify-center items-center py-2" v-for="option in addressOptions">
                <div class="col-span-10 text-left">
                  <p class="">{{ option.formatted_address }}</p>
                </div>
                <div class="col-span-2 flex justify-end items-center">
                  <Button @click="useAddressOption(option)" variant="outline">select</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="self_pickup">
          <div class="col-span-2">
            <div class="w-full bg-white shadow sm:rounded-lg border">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-base font-semibold leading-6 text-gray-900">自取需注意事项</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    您需要到
                    <strong>关丹福禄寿殡葬企业（关丹积善堂后方）</strong>
                    自取
                  </p>
                </div>
                <div class="mt-3 text-sm leading-6">
                  <a href="https://www.facebook.com/flsbcare" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    关丹福禄寿殡葬企业 Facebook
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>-->

    <!-- <Button @click="onSubmit">Next</Button> -->
  </div>
</template>

<script setup>
import { toRefs, ref, computed } from "vue";
import * as z from "zod";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDebounceFn } from "@vueuse/core";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { jsonSchemaToZod } from "json-schema-to-zod";

const props = defineProps(["json_schema", "field_config","userEmail"]);

const { json_schema, field_config, userEmail } = toRefs(props);

const schema = eval(jsonSchemaToZod(json_schema.value));

const page = ref(1);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const delivery_method = ref(undefined);

const addressInput = ref(undefined);
const addressOptions = ref([]);
const addressMetadata = ref(undefined);
// console.log(schema)

const noAddressResult = ref(false);
const addressSearchBusy = ref(false);

const emits = defineEmits(["submit"]);

const searchAddress = useDebounceFn(async () => {
  console.log(addressInput.value);

  noAddressResult.value = false;
  addressSearchBusy.value = true;

  if (addressInput.value?.length < 3) {
    addressSearchBusy.value = false;
    return;
  }

  // reset the options
  addressOptions.value = [];
  noAddressResult.value = false;

  let options_req = await fetch("/api/address.json", {
    method: "POST",
    body: JSON.stringify({
      address: addressInput.value,
    }),
  });

  if (options_req.ok) {
    let options = await options_req.json();

    console.log(options);

    addressOptions.value = options;
  } else {
    console.error("Failed to fetch address options");
    noAddressResult.value = true;
  }

  addressSearchBusy.value = false;
}, 350);

const showAddressSearch = computed(() => {
  if (addressOptions.value.length > 0) {
    let addresses = addressOptions.value.map((option) => option.formatted_address);
    console.log(addresses);
    let matched = addresses.filter((address) => address == addressInput.value);
    console.log(matched.length);
    let show = !(matched.length > 0);
    console.log(show);

    return show;
    // .length > 0;
    // .filter(  (address) => (address == addressInput.value)).length > 0;
  }

  return true;
});

const showAddressOptions = computed(() => {
  if (addressInput.value?.length < 3) return false;

  if (addressOptions.value.length > 0) {
    return !addressOptions.value.map((option) => option.formatted_address).includes(addressInput.value);
  }
});

const useAddressOption = (option) => {
  addressInput.value = option.formatted_address;
  addressMetadata.value = option;
};

const backPage1 = () => {
  page.value = 1;
};

let validatedForm = ref();

const submitPage1 = async () => {
  let { values, valid } = await form.validate();
  // console.log(result)

  if (valid) {
    validatedForm.value = { ...values };
    page.value = 2;
  }
  // });
};

const submitPage2 = () => {
  // page.value = 3;

  onSubmit();
};

const validPage2 = computed(() => {
  if (delivery_method.value == "self_pickup") {
    return true;
  }

  if (delivery_method.value == "postal") {
    return !showAddressSearch.value && addressInput.value;
  }

  return false;
});

const selectDeliveryMethod = (method) => {
  delivery_method.value = method;
};

const cancelAddressSelection = () => {
  addressInput.value = undefined;
  addressOptions.value = [];
};

const onSubmit = () => {
  console.log(validatedForm.value);

  let payload = {
    ...validatedForm.value,
    delivery_method: delivery_method.value,
    email: userEmail.value
  };

  if (delivery_method.value === "postal") {
    payload = {
      ...payload,
      address: addressInput.value,
      metadata: {
        address_metadata: addressMetadata.value,
      },
    };
  }

  emits("submit", payload);
};
</script>
