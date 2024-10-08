<template>
  <div class="w-full bg-white rounded-lg">
    <div class="">
      <!-- {{ $cart }} -->
      <div v-for="(n,index) in generatedQuestions" :key="n" class="p-4" :class="[index != generatedQuestions.length - 1?'border-b':'']">
        <div class="flex items-center justify-between mb-2">
          <label :for="`question-${n}`" class="block font-medium text-gray-700">
            问题 {{ n }}
          </label>
          <Button @click="deleteQuestion(n)" class="w-8 h-8 text-xl text-salmon-400 bg-salmon-50 focus:ring-4 focus:ring-salmon-300 rounded-lg">
            <iconify-icon icon="mdi:remove-circle"></iconify-icon>
          </Button>
        </div>
        <input type="text" :id="`question-${n}`" v-model="questions[n - 1]" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm rounded-md" />
      </div>

      
      <div v-if="numberOfQuestions < 10" class="flex justify-center">
        <Button @click="addQuestion" class="flex items-center justify-center w-10 h-10 bg-salmon-100 text-salmon-500 hover:bg-salmon-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-2xl">
          <iconify-icon icon="mdi:plus"></iconify-icon>
        </Button>
      </div>
    </div>
    <div class="px-4 pt-4">
      <div v-if="addQuestionSet">
      <Button @click="saveQuestions" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
        <span>提交问题</span>
      </Button>
    </div>
    <div v-else>
      <Button @click="editAllQuestion" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
        <span>更新全部问题</span>
      </Button>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, toRefs, defineProps, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/vue";
import { cart, editQuestionInCart, updateProductBraceletInCart, removeQuestionInCart } from "@/stores/cart";

import { defineComponent } from 'vue';
import { number } from "zod";

defineComponent({
  name: 'MdiBin',
});

const props = defineProps(["user_cart", "questionSet"]);
const numberOfQuestions = ref(1);
const questions = ref([]);
const $cart = useStore(cart);
const { user_cart, questionSet } = toRefs(props);
let latestQuestionSet = ref(questionSet.value);
let existQuestionNumber = ref(0);
const addQuestionSet = ref(false);

if ($cart._value.items[10] == null) {
  existQuestionNumber = 0;
} else {
  existQuestionNumber = $cart._value.items[10];
}

// Only add new entries to the questions array
watch(numberOfQuestions, (newVal) => {
  const currentLength = questions.value.length;
  if (newVal > currentLength) {
    for (let i = currentLength; i < newVal; i++) {
      questions.value.push("");
    }
  }
});

// generate question array based on number of questions
const generatedQuestions = computed(() => {
  return Array.from({ length: numberOfQuestions.value }, (_, i) => i + 1);
});

const addQuestion = () => {
  numberOfQuestions.value++;
};

let existingQuestions = [...(user_cart.value.metadata?.questions || [])];
const questions2 = ref(existingQuestions);

const deleteQuestion = async (index) => {

  if(addQuestionSet.value) {
    if(numberOfQuestions.value == 1) {
      alert("至少需要一个问题！");
      return;
    }
    questions.value.splice(index - 1, 1);
    numberOfQuestions.value--;
    return;
  }

  let cartMetadata = { ...$cart.value.metadata };
  questions2.value[latestQuestionSet.value-1].questionArray.splice(index-1, 1);
  questions2.value[latestQuestionSet.value-1].questionIndex = questions2.value[latestQuestionSet.value-1].questionArray.length;
  cartMetadata.questions = questions2.value;

  await removeQuestionInCart(cartMetadata);

  // Update local questions array and numberOfQuestions
  questions.value.splice(index - 1, 1);
  numberOfQuestions.value--;

  alert("成功移除问题！");
};

const saveQuestions = async () => {
  // Ensure questionSet is defined
  const questionArray = questions.value;
  console.log("Saving questions:", questionArray);
  console.log("Number of questions:", numberOfQuestions.value);
  console.log("Question set:", latestQuestionSet.value);

  // Validation: Check for empty questions
  const emptyQuestions = questionArray.some(question => question.trim() === "");
  if (emptyQuestions) {
    alert("请填写所有问题！");
    return;
  }

  const questionIndex = numberOfQuestions.value;
  const productId = "10";
  let newQuestions = {
    questionArray: questionArray,
    questionIndex: questionIndex,
  };
  let _new_qty = 1 + existQuestionNumber;

  // Initialize metadata if it is null
  let cartMetadata = $cart.value.metadata ? { ...$cart.value.metadata } : {};
  let existingQuestions = cartMetadata.questions ? [...cartMetadata.questions] : [];

  while (existingQuestions.length < latestQuestionSet.value) {
    existingQuestions.push({ questionArray: [], questionIndex: 0 });
  }

  // Update the existing question array in place
  existingQuestions[latestQuestionSet.value - 1].questionArray = questionArray;
  existingQuestions[latestQuestionSet.value - 1].questionIndex = questionIndex;

  cartMetadata.questions = existingQuestions;
  await updateProductBraceletInCart(productId, _new_qty, cartMetadata);

  alert("加入购物车成功！");
  window.location.reload();
};

const editAllQuestion = async () => {
  const questionIndex = numberOfQuestions.value;
  let cartMetadata = { ...$cart.value.metadata };
  const questionArray = questions2.value[latestQuestionSet.value-1].questionArray;

  for (let i = 1; i <= questionIndex; i++) {
    const value = document.getElementById(`question-${i}`).value;

    // Add validation: Check for empty questions
    if (value.trim() === "") {
      alert("请填写所有问题！");
      return;
    }

    // If questionArray doesn't have the current index, add a new element
    if (i - 1 >= questionArray.length) {
      questionArray.push(value);
    } else {
      questionArray[i - 1] = value;
    }
  }

  cartMetadata.questions = questions2.value;

  await editQuestionInCart(cartMetadata);
  alert("成功更改所有问题！");
};

// Initialize questions array from $cart metadata on mount
onMounted(() => {
  if ($cart.value.metadata && $cart.value.metadata.questions && $cart.value.metadata.questions[questionSet.value - 1]) {
    console.log("Initial questions:", $cart.value.metadata.questions[questionSet.value - 1].questionArray);
    questions.value = [...$cart.value.metadata.questions[questionSet.value - 1].questionArray];
    numberOfQuestions.value = questions.value.length;
  } else {
    console.log("Questions array not found or invalid index");
    if (questionSet.value == undefined) {
      latestQuestionSet.value = 1;
      console.log("latestQuestionSet is undefined, thus set to 1");
    }
    addQuestionSet.value = true;
  }
});
</script>