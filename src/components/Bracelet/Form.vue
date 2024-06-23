<template>
    <div class="w-full">
      <template v-if="page == 1">
        <AutoForm class="w-full space-y-6 mb-8" :form="form" :schema="schema" :field-config="field_config" @submit="submitPage1"></AutoForm>
        <Button @click="submitPage1()" class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
          <span class="text-xl text-white">加入购物车</span>
        </Button>
      </template>
    </div>
  </template>
  
  <script setup>
  import { toRefs, ref, computed } from "vue";
  import * as z from "zod";
  import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  
  import { useDebounceFn } from "@vueuse/core";
  
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  
  import { jsonSchemaToZod } from "json-schema-to-zod";

  import CustomCheckboxGroup from './CustomCheckboxGroup.vue';
  
  const props = defineProps(["json_schema", "field_config"]);
  
  const { json_schema, field_config } = toRefs(props);
  
  const schema = eval(jsonSchemaToZod(json_schema.value));
  
  const page = ref(1);
  
  const form = useForm({
    validationSchema: toTypedSchema(schema),
  });
  
  const submitPage1 = async () => {
    let { valid } = await form.validate();
    // console.log(result)
  
    // if (valid) {
    //   page.value = 2;
    // }
    // });
  };
  
//   const onSubmit = () => {
//     // console.log(form.values)
  
//     let payload = {
//       ...form.values,
//       delivery_method: delivery_method.value,
//     };
  
//     if (delivery_method.value === "postal") {
//       payload = {
//         ...payload,
//         address: addressInput.value,
//         metadata: {
//           address_metadata: addressMetadata.value,
//         },
//       };
//     }
  
//     emits("submit", payload);
//   };

  </script>
  