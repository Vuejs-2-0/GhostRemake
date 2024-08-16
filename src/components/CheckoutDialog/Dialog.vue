<template>
  <div class="w-full">
    <Dialog v-model:open="open" @update:open="dialogUpdated">
      <DialogTrigger @click="open = true" class="w-full outline-none">
        <slot></slot>
      </DialogTrigger>
      <DialogContent class="p-1 w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-xl">
        <VisuallyHidden asChild>
          <DialogTitle>Checkout Modal</DialogTitle>
        </VisuallyHidden>

        <VisuallyHidden asChild>
          <DialogDescription>Checkout Modal</DialogDescription>
        </VisuallyHidden>

        <div class="w-full h-full bg-white rounded-xl p-2 flex justify-center flex-col items-center">
          <template v-if="page == 'list'">
            <div class="py-12 text-center">
              <h1 class="text-2xl font-semibold">结账</h1>
              <p>请确认商品及数量</p>
            </div>

            <div class="w-full">
              <div v-for="product in productList" :key="product.id" class="w-full grid grid-cols-11 gap-2 mt-4 justify-center items-center">
                <img :src="product.media.image" alt="Product Image" class="w-full col-span-2 aspect-square bg-white rounded-xl border object-cover" />
                <div class="col-span-5">
                  <div class="flex justify-start items-center">
                    <div class="p-0.5 bg-salmon-50 rounded-md px-2 text-sm mr-2 text-salmon-500">1 x</div>
                    <p class="text-lg font-semibold">{{ product.name }}</p>
                  </div>
                  <p>RM {{ product.price }}.00</p>
                </div>
                <AddButton :product="product" />
              </div>
              <div v-for="product in braceletList" :key="product.id" class="w-full grid grid-cols-11 gap-2 mt-4 justify-center items-center">
                <img src="/img/bracelet.webp" alt="Product Image" class="w-full col-span-2 aspect-square bg-white rounded-xl border object-cover" />
                <div class="col-span-5">
                  <div class="flex justify-start items-center">
                    <div class="p-0.5 bg-salmon-50 rounded-md px-2 text-sm mr-2 text-salmon-500">1 x</div>
                    <p class="text-lg font-semibold">五色绳</p>
                  </div>
                  <p>RM 28.00</p>
                  <p class="text-[12px] font-light">
                    <template v-if="product.effect && product.effect.length > 0">效果: {{ product.effect.join(', ') }}, </template>
                    大小: {{ product.size }}
                    <template v-if="product.comment">, 备注: {{ product.comment }}</template>
                  </p>
                </div>
                <div class="col-span-4 flex justify-center items-center h-full">
                  <RemoveButton :product="product" :localCart="props.localCart" />
                </div>
              </div>
              <div v-for="product in questionList" :key="product.id" class="w-full grid grid-cols-11 gap-2 mt-4 justify-center items-center">
                <img src="/img/bracelet.webp" alt="Product Image" class="w-full col-span-2 aspect-square bg-white rounded-xl border object-cover" />
                <div class="col-span-5">
                  <div class="flex justify-start items-center">
                    <div class="p-0.5 bg-salmon-50 rounded-md px-2 text-sm mr-2 text-salmon-500">1 x</div>
                    <p class="text-lg font-semibold">问题</p>
                  </div>
                  <p>RM 100.00</p>
                </div>
                <div class="col-span-4 flex justify-center items-center h-full">
                  <Questionnaire :cart="localCart" :cartIndex="product.id+1"><div class="cursor-pointer text-blue-500 underline">编辑</div></Questionnaire>
                </div>
              </div>
            </div>

            <div class="pt-8 w-full sticky bottom-4">
              <Button @click="confirmItems()" class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
                <span class="text-xl text-white">确认</span>
              </Button>
            </div>
          </template>

          <template v-if="page == 'signup'">
            <SignUp />
          </template>

          <template v-if="page == 'login'">
            <Login />
          </template>

          <template v-if="page == 'form'">
            <div class="w-full">
              <Form class="w-full" :json_schema="form.schema.definitions.zodSchema" :field_config="form.metadata.field_config" :userEmail="userEmail" :userMetadata="userMetadata" @submit="computeTx" />
            </div>
          </template>

          <template v-if="page == 'loading'">
            <div class="w-full aspect-square flex flex-col justify-center items-center">
              <iconify-icon class="text-8xl text-salmon-500" icon="eos-icons:three-dots-loading"></iconify-icon>
              <p>正在结算，请稍后</p>
            </div>
          </template>

          <template v-if="page == 'summary'">
            <div class="py-12 flex justify-center items-center relative w-full">

              <Button class="absolute top-0 left-0" @click="backToForm()" variant="outline">返回</Button>

              <h1 class="text-2xl font-semibold">请确认订单</h1>
            </div>

            <Summary class="w-full" :form="dry_run_result.form" :productEntries="productEntries" :postageEntry="postageEntry" :value="dry_run_result.value" :hide_footer="true" />


            <div class="flex gap-x-2 w-full pt-4 px-2">
              <div v-if ="isGuestUser==false">
                <Checkbox v-model:checked="checkedUpdateUserMetadata" />
                  <label
                    for="terms1"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                   保存资料至我的账户
                  </label>
              </div>   
            </div>
            <div class="mt-4 pt-4 w-full flex justify-between items-center border-t">
              <div class="">
                <p class="text-xl">总计</p>
                <p class="text-2xl font-bold">RM {{ dry_run_result.value }}</p>
              </div>

              <Button @click="confirmOrder()" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
                <span class="text-white">确认并付款</span>
              </Button>
            </div>
          </template>

          <template v-if="page == 'payment_loading'">
            <div class="w-full aspect-square flex flex-col justify-center items-center">
              <iconify-icon class="text-8xl text-salmon-500" icon="eos-icons:three-dots-loading"></iconify-icon>
              <p>正在下单，请稍后</p>
            </div>
          </template>
        </div>
      </DialogContent>
    </Dialog>


    <TransitionRoot as="template" :show="guestModalOpen">
    <HeadlessDialog class="relative z-10" @close="guestModalOpen = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <HeadlessDialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>

                <p class="text-3xl font-bold text-center py-12">尚未登入</p>
                
                <div class="mt-3 text-center sm:mt-5">
                  
                  <div class="mt-2">
                    <p class="text-lg text-gray-500">目前正在以访客身份结账，访客身份无法保存订单。若您有账户，请登入以保存订单。</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 space-y-2">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-salmon-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-salmon-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salmon-600" @click="goToLoginPage()">登入或注册</button>

                <button type="button" class="inline-flex w-full justify-center rounded-md bg-salmon-100 px-3 py-2 font-semibold text-salmon-500 shadow-sm hover:bg-salmon-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salmon-600" @click="proceedAsGuest()">以访客身份继续</button>
                
              </div>
            </HeadlessDialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>


  </div>
</template>

<script setup>
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox'
import { ref, toRefs, computed } from "vue";
import { cart } from "@/stores/cart";
import { useStore } from "@nanostores/vue";
import { VisuallyHidden } from "radix-vue";
import AddButton from "./AddButton.vue";
import RemoveButton from "./RemoveButton.vue";
import Summary from "./Summary.vue";
import SignUp from "@/components/Authentication/SignUp2.vue";
import Login from "@/components/Authentication/Login.vue";
import Form from "@/components/Checkout/Form.vue";
import Questionnaire from "../Questionnaire/Questionnaire.vue";
import { Dialog as HeadlessDialog, DialogPanel as HeadlessDialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false);
const checkedUpdateUserMetadata = ref(true);
const $cart = useStore(cart);
const props = defineProps({
  form: Object,
  products: Object, // or Array, depending on the type you're passing
  userId: String,
  localCart: Object,
  userEmail: String,
  userMetadata: Object,
});

const guestModalOpen = ref(false)

const { localCart } = toRefs(props);

const productList = computed(() => {
  if (!$cart.value.items) return [];
  const filtered = products.value.filter(p => $cart.value.items[p.id])
                                 .map(p => ({ ...p, quantity: $cart.value.items[p.id] }));;
  const product9 = filtered.find(p => p.id === 9);
  if (product9) {
    filtered.splice(filtered.indexOf(product9), 1);
  }
  return filtered;
});

const braceletList = computed(() => {
  if (!$cart.value.items) return [];
  let quantity = 0;
  quantity = $cart.value.items["9"];
  
  const braceletList = [];
  for (let i = 0; i < quantity; i++) {
    braceletList.push({
      id: i,
      quantity: 1,
      comment: localCart.value.metadata.bracelets[i].comment,
      effect: localCart.value.metadata.bracelets[i].effect,
      size: localCart.value.metadata.bracelets[i].size,
    });
  }
  return braceletList;
});

const questionList = computed(() => {
  if (!$cart.value.items) return [];
  let quantity = 0;
  quantity = $cart.value.items["10"];
  
  const questionList = [];
  for (let i = 0; i < quantity; i++) {
    questionList.push({
      id: i,
      quantity: 1,
    });
  }
  return questionList;
});

const { form, products } = toRefs(props);
const page = ref("list");

const isGuestUser = computed(() => props.userId.substring(0, 5) == "guest");

const confirmItems = () => {

  if(isGuestUser.value) {
    open.value = false;
    guestModalOpen.value = true;
  } else {
    page.value = "form";
  }

};

const goToLoginPage = () => {
  guestModalOpen.value = false;
  open.value = true;
  page.value = 'login';
};

const proceedAsGuest = () => {
  guestModalOpen.value = false;
  open.value = true;
  page.value = 'form';
}

const dry_run_result = ref(false);

const computeTx = async (ev) => {

  page.value = "loading";

  dry_run_result.value = false;

  const formData = ev;

  let _dry_run_result = await fetch("/api/tx.json", {
    method: "POST",
    body: JSON.stringify({
      form: formData,
      cartId: cart.value.id,
      dry_run: true,
    }),
  });

  dry_run_result.value = await _dry_run_result.json();

  page.value = "summary";
};

const productEntries = computed(() => dry_run_result.value.entries.filter((entry) => entry.type === "product"));
const postageEntry = computed(() => dry_run_result.value.entries.filter((entry) => entry.type === "postage"));

const dialogUpdated = (ev) => {
  if (ev == false) {
    page.value = "list";
  }
};

const backToForm = () => {
  page.value = "form";
};

const confirmOrder = async () => {

  page.value = "payment_loading";

  let _submit_result = await fetch("/api/tx.json", {
    method: "POST",
    body: JSON.stringify({
      form: dry_run_result.value.form,
      cartId: cart.value.id,
      dry_run: false,
      update_metadata: checkedUpdateUserMetadata.value,
      user_id: props.userId,
    }),
    redirect: "follow",
  });

  if (_submit_result.redirected) {
    open.value = false;
    window.swup.navigate(_submit_result.url)
  }
};
</script>
