<template>
    <div class="w-full p-6 bg-white shadow-md rounded-lg">
      <div class="space-y-4 pb-5">
        <label for="numberOfQuestions" class="text-sm font-medium text-gray-700">
          选择问题数量
        </label>
        <select id="numberOfQuestions" v-model="numberOfQuestions" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm rounded-md">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
        <div v-for="n in generatedQuestions" :key="n" class="space-y-2">
          <label :for="`question-${n}`" class="block text-sm font-medium text-gray-700">
            问题 {{ n }}
          </label>
          <input type="text" :id="`question-${n}`" v-model="questions[n - 1]" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm rounded-md" />
        </div>
      </div>
      <Button @click="saveQuestions" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
        <span>加入购物车</span>
      </Button>
    </div>
  </template>

<script setup>
import { ref, computed, watch, toRefs, defineProps } from "vue";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/vue";
import { cart, updateProductBraceletInCart } from "@/stores/cart";

const props = defineProps(["user_cart"]);
const numberOfQuestions = ref(1);
const questions = ref([]);
const $cart = useStore(cart);
const { user_cart } = toRefs(props);
let existQuestionNumber = ref(0);

// console.log($cart._value.items[10])
if($cart._value.items[10] == null){
    existQuestionNumber = 0
} else {
    existQuestionNumber = $cart._value.items[10]
}
// console.log(existQuestionNumber)
watch(numberOfQuestions, (newVal) => {
    questions.value = Array(newVal).fill("");
})

// generate question array based on number of questions
const generatedQuestions = computed(() => {
    return Array.from({ length: numberOfQuestions.value }, (_, i) => i + 1);
})

// saveQuestions function by console.log
const saveQuestions = async () => {
    const questionArray = questions.value
    const questionIndex = numberOfQuestions.value
    const productId = "10"
    let newQuestions = {
        questionArray: questionArray,  // Store selected effects here
        questionIndex: questionIndex,
    };
    // console.log(questionIndex)
    // console.log(existQuestionNumber)

    // TODO: Change it become can add new quantity
    let _new_qty = questionIndex + existQuestionNumber;

    let cartMetadata = {...$cart.value.metadata}
    let existingQuestions = [...(user_cart.value.metadata?.questions || [])];
    existingQuestions.push(newQuestions)
    cartMetadata.questions = existingQuestions
    await updateProductBraceletInCart(productId, _new_qty, cartMetadata);
  
    // Add an alert before reload page
    alert("加入购物车成功！");

    // Refresh page
    window.location.reload();
};
</script>

