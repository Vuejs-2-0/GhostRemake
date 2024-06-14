<template>
  <div>
    <AutoForm class="w-2/3 space-y-6" :form="form" :schema="schema" :field-config="field_config" @submit="onSubmit">
      <!-- <Button type="submit">
      Next
    </Button> -->
    </AutoForm>

    <div class="py-4">
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
    </div>

    <Button @click="onSubmit">Next</Button>
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

const props = defineProps(["json_schema", "field_config"]);

const { json_schema, field_config } = toRefs(props);

const schema = eval(jsonSchemaToZod(json_schema.value));

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const delivery_method = ref("postal");

const addressInput = ref(undefined);
const addressOptions = ref([]);
const addressMetadata = ref(undefined);
// console.log(schema)

const emits = defineEmits(["submit"]);

const searchAddress = useDebounceFn(async () => {
  console.log(addressInput.value);

  if (addressInput.value?.length < 3) return;

  // reset the options
  addressOptions.value = [];

  let options_req = await fetch("/api/address.json", {
    method: "POST",
    body: JSON.stringify({
      address: addressInput.value,
    }),
  });

  let options = await options_req.json();

  console.log(options);

  addressOptions.value = options;
}, 500);

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

const onSubmit = () => {
  // console.log(form.values)

  let payload = {
    ...form.values,
    delivery_method: delivery_method.value,
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
