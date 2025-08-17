<template>
  <div class="w-full">
    <template v-if="page == 1">
      <div class="py-12">
        <h1 class="text-2xl font-semibold text-center">请填写资料</h1>
      </div>

      <div class="mb-4">
        <div v-if="isGuestUser">
          <div class="mb-2">
            <span class="text-sm font-semibold my-1">电邮地址 Email</span>
            <span class="text-red-500 ml-1">*</span>
          </div>
          <Input v-model="guestEmail" class="col-span-5" placeholder="请输入您的电邮地址 Email"/>
        </div>
        <div v-else>
          <p class="text-sm font-semibold my-1">电邮地址 Email</p>
          <p>{{ userEmail }}</p>
        </div>
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
            <div class="mt-2 p-3 rounded-md bg-gray-100 text-sm text-gray-700">
              <p>温馨提醒：选择自取后，请等待我们的团队通知您前来取货。在收到通知前，请勿自行前往，以免白跑一趟。</p>
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
      </div>

      <div class="w-full flex justify-between items-center pt-4">
        <Button @click="backPage1()" variant="outline">上一步</Button>

        <Button :disabled="!delivery_method" @click="submitPage2()" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
          <span class="text-white">下一步</span>
        </Button>
      </div>
    </template>

    <template v-if="page == 3">
      <div class="py-12">
        <h1 class="text-2xl font-semibold text-center">请输入收件地址</h1>
      </div>

      <div class="space-y-4">
        <div class="p-1">
          <Input 
            type="text" 
            placeholder="Enter your address..." 
            v-model="addressInput" 
            class="focus-visible:ring-salmon-500" 
          />
        </div>

        <Button 
          @click="validateAddress" 
          :disabled="!addressInput || addressSearchBusy"
          class="w-full bg-salmon-500 hover:bg-salmon-600"
        >
          <span v-if="!addressSearchBusy">确认地址</span>
          <div v-else class="flex items-center justify-center gap-2">
            <span>验证中</span>
            <iconify-icon icon="eos-icons:three-dots-loading" class="text-2xl"></iconify-icon>
          </div>
        </Button>

        <div class="w-full flex justify-start items-center">
          <div class="bg-red-100 text-red-500 p-1.5 px-3 text-sm rounded-xl" v-if="noAddressResult">
            未找到地址，请输入完整地址
          </div>
        </div>

        <div v-if="addressValidated" class="p-4 border rounded-lg space-y-2">
          <div class="flex items-center gap-2">
            <iconify-icon icon="carbon:checkmark-filled" class="text-green-500 text-xl"></iconify-icon>
            <p class="font-medium">地址已确认</p>
          </div>
          <p class="text-gray-600">{{ addressInput }}</p>
          <div class="pt-2">
            <p class="font-medium">邮费总计: RM{{ Number(postageCostPreview).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-between items-center pt-4">
        <Button @click="backPage2()" variant="outline">上一步</Button>

        <Button 
          :disabled="!addressValidated" 
          @click="onSubmit()" 
          class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3"
        >
          <span class="text-white">确认</span>
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { toRefs, ref, computed, onMounted, watch } from "vue";
import * as z from "zod";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { jsonSchemaToZod } from "json-schema-to-zod";

const props = defineProps(["json_schema", "field_config","userEmail","userMetadata","products"]);

const { json_schema, field_config, userEmail, userMetadata, products} = toRefs(props);

let text_schema = jsonSchemaToZod(json_schema.value)

text_schema = text_schema.replace(`"phoneNumber": z.string()`, `"phoneNumber": z.string().transform((value) => String(value) )`)

const schema = eval(text_schema);

const page = ref(1);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

console.log(form)

const delivery_method = ref(undefined);
const guestEmail = ref(undefined);
const addressInput = ref(undefined);
const addressOptions = ref([]);
const addressMetadata = ref(undefined);

const postageCostPreview = ref(-1);

const noAddressResult = ref(false);
const addressSearchBusy = ref(false);

const addressValidated = ref(false);

const emits = defineEmits(["submit"]);

const preview_postage = (_address_metadata) => {
  let address_metadata = _address_metadata;

      let postage_cost_map = {
        west_malaysia: { label: "West Malaysia", value: 10 },
        east_malaysia: { label: "East Malaysia", value: 15 },
        singapore: { label: "Singapore", value: 69.8 },
        taiwan: { label: "Taiwan", value: 71.85 },
        hong_kong: { label: "Hong Kong", value: 69.62 },
        usa: { label: "USA", value: 82.98 },
        default: { label: "Others", value: 82.98 },
      };

      let detect_non_malaysia_shipping = (_address_metadata) => {
        for (let component of _address_metadata.address_components) {
          if (component.types.includes("country")) {
            if (component.short_name === "MY") {
              return false;
            } else if (component.short_name === "SG") {
              return postage_cost_map["singapore"];
            } else if (component.short_name === "TW") {
              return postage_cost_map["taiwan"];
            } else if (component.short_name === "HK") {
              return postage_cost_map["hong_kong"];
            } else if (component.short_name === "US") {
              return postage_cost_map["usa"];
            } else {
              return postage_cost_map["default"];
            }
          }
        }

        return postage_cost_map["default"];

      };

      let atomic_shipping_type = detect_non_malaysia_shipping(address_metadata);

      if (atomic_shipping_type === false) {
        // check if east or west malaysia

        let state = address_metadata.address_components.find((component) => component.types.includes("administrative_area_level_1"));

        if ((state && state.long_name === "Sabah") || state.long_name === "Sarawak") {
          atomic_shipping_type = postage_cost_map["east_malaysia"];
        } else {
          atomic_shipping_type = postage_cost_map["west_malaysia"];
        }
      }

      // the atomic postage cost is calculated, but each "unit" is bundled in 3 products
      // i.e. 1 postage cost for 3 products, if 4-6 products, then 2 postage cost

      
      let productCount = products.value.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      
      //console.log(productCount);
      let total_postage_cost = Math.ceil(productCount / 3) * Number(atomic_shipping_type?.value);

      return total_postage_cost;
}

const validateAddress = async () => {
  addressValidated.value = false;
  postageCostPreview.value = -1;
  noAddressResult.value = false;
  addressSearchBusy.value = true;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressInput.value)}&key=AIzaSyDZ4CXCTm6__5wf_IOlBA9L5JbLm7-sR3I`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      }
    );

    const { results, status } = await response.json();
    
    if (status === "OK" && results.length > 0) {
      addressMetadata.value = results[0];
      postageCostPreview.value = preview_postage(results[0]);
      addressValidated.value = true;
      noAddressResult.value = false;
    } else {
      noAddressResult.value = true;
    }
  } catch (error) {
    console.error("Failed to validate address:", error);
    noAddressResult.value = true;
  } finally {
    addressSearchBusy.value = false;
  }
};

const isGuestUser = computed(() => {
  return (String(userEmail.value).split("@").pop() === "guest.com")
});

const showPostageCost = computed(() => {
  if(postageCostPreview.value > 0){
    return true;
  } else {
    return false;
  }
});

// const showAddressOptions = computed(() => {
//   if (addressInput.value?.length < 3) return false;

//   if (addressOptions.value.length > 0) {
//     return !addressOptions.value.map((option) => option.formatted_address).includes(addressInput.value);
//   }
// });

// const useAddressOption = (option) => {
//   addressInput.value = option.formatted_address;
//   addressMetadata.value = option;
// };

const backPage1 = () => {
  page.value = 1;
};

let validatedForm = ref();

const submitPage1 = async () => {
  let { values, valid } = await form.validate();
  
  // Cast values.phoneNumber to string if it is not already a string
  values.phoneNumber = typeof values.phoneNumber === 'string' ? values.phoneNumber : String(values.phoneNumber);

  if (valid) {
    validatedForm.value = { ...values };
    page.value = 2;
  }
};

const backPage2 = () => {
  page.value = 2;
};

const submitPage2 = () => {
  if (delivery_method.value === 'self_pickup') {
    onSubmit();
  } else {
    page.value = 3;
  }
};

const validPage2 = computed(() => {
  return delivery_method.value !== undefined;
});

const validPage3 = computed(() => {
  return addressValidated.value;
});

const selectDeliveryMethod = (method) => {
  delivery_method.value = method;
};

const cancelAddressSelection = () => {
  addressInput.value = undefined;
  addressOptions.value = [];
};

const onSubmit = () => {
  let payload = {
    ...validatedForm.value,
    delivery_method: delivery_method.value,
    email: isGuestUser.value ? guestEmail.value : userEmail.value
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

  console.log(payload);

  if(window?.posthog){
    window.posthog.capture("checkout_submit", payload);
  }

  emits("submit", payload);
};

onMounted(() => {
  if(userMetadata.value?.chineseName){
    form.setFieldValue('chineseName', userMetadata.value.chineseName)
  }

  if(userMetadata.value?.phoneNumber){
    form.setFieldValue('phoneNumber', userMetadata.value.phoneNumber)
  }

  if(userMetadata.value?.englishName){
    form.setFieldValue('englishName', userMetadata.value.englishName)
  }
});

watch(addressInput, () => {
  addressValidated.value = false;
  postageCostPreview.value = -1;
  noAddressResult.value = false;
});
</script>
