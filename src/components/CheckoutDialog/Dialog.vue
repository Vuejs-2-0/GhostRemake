<template>
  <Dialog>
    <DialogTrigger class="w-full outline-none">
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="p-1 w-full max-w-sm max-h-[85vh] overflow-y-scroll rounded-xl">
      <div class="w-full h-full bg-white rounded-xl p-2 flex justify-center flex-col items-center">
        <template v-if="page == 'list'">
          <div class="py-12">
            <h1 class="text-2xl font-semibold">请确认商品</h1>
          </div>

          <div class="w-full">
            <div v-for="i in 10" class="w-full grid grid-cols-11 gap-2 mt-4 justify-center items-center">
              <div class="w-full col-span-2 aspect-square bg-white rounded-xl border"></div>

              <div class="col-span-5">
                <div class="flex justify-start items-center">
                  <div class="p-0.5 bg-salmon-50 rounded-md px-2 text-sm mr-2 text-salmon-500">1 x</div>
                  <p class="text-lg font-semibold">真的友鬼 1</p>
                </div>
                <p>RM 25.00</p>
              </div>

              <div class="col-span-4 grid grid-cols-3 justify-center items-center">
                <div class="w-full flex justify-center items-center">
                  <Button class="w-8 h-8 rounded-full bg-salmon-100 text-salmon-500 hover:bg-salmon-100 hover:text-salmon-500 text-lg flex justify-center items-center">
                    <iconify-icon class="text-lg" icon="ic:round-minus"></iconify-icon>
                  </Button>
                </div>

                <div class="text-center w-full">1</div>

                <div class="w-full flex justify-center items-center">
                  <Button class="w-8 h-8 rounded-full bg-salmon-100 text-salmon-500 hover:bg-salmon-100 hover:text-salmon-500 text-lg flex justify-center items-center">
                    <iconify-icon class="text-lg" icon="ic:round-plus"></iconify-icon>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-8 w-full sticky bottom-4">
            <Button class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
              <span class="text-xl text-white">确认</span>
            </Button>
          </div>
        </template>

        <div class="w-full">

            <div class="py-12">
                <h1 class="text-2xl font-semibold">请填写个人资料</h1>
            </div>

            <Form class="w-full" :json_schema="form.schema.definitions.zodSchema" :field_config="form.metadata.field_config" @submit="computeTx" />

        </div>

      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ref, toRefs } from "vue";
import Form from "@/components/Checkout/Form.vue";


const props = defineProps(["form"]);
const { form } = toRefs(props);
const page = ref("form");

const computeTx = async (ev) => {
    console.log(ev);
    // page.value = "list";
};

</script>
