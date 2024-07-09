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
            </div>

            <div class="pt-8 w-full sticky bottom-4">
              <div v-if="isGuestUser">
                <div class="w-full flex flex-col items-center">
                  <p class="px-6 pb-4 text-center">
                    请先登录帐号 
                    <a @click.prevent="goToLoginPage" href="#" class="text-salmon pl-2">立即登录</a>
                  </p>
                  <Button @click="confirmItems()" class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3" disabled>
                    <span class="text-xl text-white">确认</span>
                  </Button>
                </div>
              </div>
              <div v-else>
                <Button @click="confirmItems()" class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
                  <span class="text-xl text-white">确认</span>
                </Button>
              </div>
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
            <div class="py-12">
              <h1 class="text-2xl font-semibold">请确认订单</h1>
            </div>

            <Summary class="w-full" :form="dry_run_result.form" :productEntries="productEntries" :postageEntry="postageEntry" :value="dry_run_result.value" />


            <div class="flex gap-x-2 w-full pt-4 px-2">
    <Checkbox v-model:checked="checkedUpdateUserMetadata" />
    <div class="grid gap-1.5 leading-none">
      <label
        for="terms1"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        保存资料至我的账户
      </label>
      
    </div>
  </div>

          <!-- <div class="w-full">
            <div v-for="entry in productEntries" :key="entry.entry_id" class="w-full grid grid-cols-4 gap-2 mt-4 justify-center items-center text-center">
              <p class="text-left pl-1 col-span-2">{{ entry?.metadata?.label }} {{ entry?.metadata?.bracelets }}</p>
              <p class="col-span-1 text-sm">RM {{ entry?.metadata?.product?.price }}</p>
              <p class="col-span-1 text-sm">RM {{ entry?.value }}</p>
            </div>
          </div>

            <hr class="my-6 w-full" />

            <div class="w-full">
              <p class="mb-1 font-bold text-sm">配送方式</p>
              <div class="w-full">
                <template v-if="dry_run_result.form.delivery_method == 'postal'">
                  <p>邮寄</p>
                  <p class="text-sm mt-1">地址: {{ dry_run_result.form.address }}</p>
                </template>
                <template v-if="dry_run_result.form.delivery_method == 'self_pickup'">
                  <p>自取</p>
                </template>
              </div>
            </div>

            <hr class="my-6 w-full" />

            <div class="w-full">
              <p class="mb-1 font-bold text-sm">个人资料</p>
              <p>
                中文姓名：
                <span class="text-sm font-light">{{ dry_run_result.form.chineseName }}</span>
              </p>
              <p>
                英文姓名：
                <span class="text-sm font-light">{{ dry_run_result.form.chineseName }}</span>
              </p>
              <p>
                联络号码：
                <span class="text-sm font-light">{{ dry_run_result.form.phoneNumber }}</span>
              </p>
              <p>
                电邮地址：
                <span class="text-sm font-light">{{ dry_run_result.form.email }}</span>
              </p>
            </div> -->

            <div class="pt-8 w-full sticky bottom-4">
              <!-- <div class="w-full flex justify-between items-center px-2 py-4 border-y mb-4">
                <p class="text-xl">总计</p>
                <p class="text-2xl font-bold">RM {{ dry_run_result.value }}</p>
              </div> -->

              <div class="w-full flex justify-between items-center">
                <Button @click="backToForm()" variant="outline">上一步</Button>

                <Button @click="confirmOrder()" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
                  <span class="text-white">确认并付款</span>
                </Button>
              </div>
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
  </div>
</template>

<script setup>
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox'
import { ref, toRefs } from "vue";
import Form from "@/components/Checkout/Form.vue";
import { computed } from "vue";
import { cart } from "@/stores/cart";
import { useStore } from "@nanostores/vue";
import AddButton from "./AddButton.vue";
import RemoveButton from "./RemoveButton.vue";
import { VisuallyHidden } from "radix-vue";
import SignUp from "@/components/Authentication/SignUp2.vue";
import Login from "@/components/Authentication/Login.vue";

const open = ref(false);

const checkedUpdateUserMetadata = ref(true);

import Summary from "./Summary.vue";
// import { User } from "lucide-vue-next";
// import { effect } from "zod";

const $cart = useStore(cart);
const props = defineProps({
  form: Object,
  products: Object, // or Array, depending on the type you're passing
  userId: String,
  localCart: Object,
  userEmail: String,
  userMetadata: Object,
});

const { localCart } = toRefs(props);

const productList = computed(() => {
  if (!$cart.value.items) return [];
  // initiate an array to store the filter
  const filtered = products.value.filter(p => $cart.value.items[p.id])
                                 .map(p => ({ ...p, quantity: $cart.value.items[p.id] }));;
  //If there is a product with id "9", separate it out
  const product9 = filtered.find(p => p.id === 9);
  //If there is a product with id "9", remove it from the filtered array
  if (product9) {
    filtered.splice(filtered.indexOf(product9), 1);
  }
  return filtered;
});

const braceletList = computed(() => {
  if (!$cart.value.items) return [];
  let quantity = 0;
  quantity = $cart.value.items["9"];
  console.log(quantity);
  console.log(localCart?.value?.metadata?.bracelets);
  
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
  console.log(braceletList);
  return braceletList;
});


const { form, products } = toRefs(props);
const page = ref("list");

const isGuestUser = computed(() => props.userId.substring(0, 5) == "guest");

const confirmItems = () => {
  if(props.userId.substring(0, 5) == "guest"){
    page.value = "login";
  } else{
    page.value = "form";
  }
};

const goToLoginPage = () => {
  page.value = 'login';
};

const dry_run_result = ref(false);

const computeTx = async (ev) => {
  console.log(ev);

  page.value = "loading";

  dry_run_result.value = false;

  const formData = ev;
  // console.log(formData)

  let _dry_run_result = await fetch("/api/tx.json", {
    method: "POST",
    body: JSON.stringify({
      form: formData,
      cartId: cart.value.id,
      dry_run: true,
    }),
  });

  dry_run_result.value = await _dry_run_result.json();

  console.log(dry_run_result.value);

  page.value = "summary";
};

const productEntries = computed(() => dry_run_result.value.entries.filter((entry) => entry.type === "product"));
const postageEntry = computed(() => dry_run_result.value.entries.filter((entry) => entry.type === "postage"));

const dialogUpdated = (ev) => {
  console.log(ev);
  if (ev == false) {
    page.value = "list";
  }
};

const backToForm = () => {
  page.value = "form";
};

const confirmOrder = async () => {

  // console.log(dry_run_result.value.form);

  // return

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
    // window.location.href = _submit_result.url;
    window.swup.navigate(_submit_result.url)
  }
};
</script>
