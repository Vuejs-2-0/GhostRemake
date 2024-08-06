<template>
  <div class="w-full p-6 bg-white shadow-md rounded-lg">
    <div class="space-y-4 pb-5">
      {{ $cart }}
      <div v-for="n in generatedQuestions" :key="n" class="space-y-2">
        <label :for="`question-${n}`" class="block text-sm font-medium text-gray-700">
          问题 {{ n }}
        </label>
        <input type="text" :id="`question-${n}`" v-model="questions[n - 1]" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm rounded-md" />
        <div class="flex items-center space-x-4">
          <Button @click="editQuestion(n)" class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 rounded-lg">更改</Button>
          <Button @click="deleteQuestion(n)" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-lg">移除</Button>
        </div>
      </div>
      <div v-if="numberOfQuestions < 10" class="flex justify-center">
        <Button @click="addQuestion" class="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          <span class="text-xl font-bold text-gray-700">+</span>
        </Button>
      </div>
    </div>
    <Button @click="saveQuestions" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
      <span>加入购物车</span>
    </Button>
  </div>
</template>

<script setup>
import { ref, computed, watch, toRefs, defineProps, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/vue";
import { cart, editQuestionInCart, updateProductBraceletInCart, removeQuestionInCart } from "@/stores/cart";

const props = defineProps(["user_cart", "questionSet"]);
const numberOfQuestions = ref(1);
const questions = ref([]);
const $cart = useStore(cart);
const { user_cart, questionSet } = toRefs(props);
let latestQuestionSet = ref(questionSet.value);
let existQuestionNumber = ref(0);

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

const editQuestion = async (index) => {
  const value = (document.getElementById(`question-${index}`)).value;
  console.log("Editing question:", index, value);
  console.log("Question set:", latestQuestionSet.value);
  let cartMetadata = { ...$cart.value.metadata };
  console.log("cartMetadata:", cartMetadata.questions);
  console.log("questions2:", questions2.value[latestQuestionSet-1]);
  questions2.value[latestQuestionSet.value-1].questionArray[index-1] = value;
  cartMetadata.questions = questions2.value;
  await editQuestionInCart(cartMetadata);
  alert("成功更改问题！");
};

const deleteQuestion = async (index) => {
  let cartMetadata = { ...$cart.value.metadata };
  questions2.value[latestQuestionSet.value-1].questionArray.splice(index-1, 1);
  questions2.value[latestQuestionSet.value-1].questionIndex = questions2.value[latestQuestionSet.value-1].questionArray.length;
  cartMetadata.questions = questions2.value;

  await removeQuestionInCart(cartMetadata);

  // Update local questions array and numberOfQuestions
  questions.value.splice(index - 1, 1);
  numberOfQuestions.value--;

  alert("成功移除问题！");
  if(numberOfQuestions.value == 0) {
    window.location.reload();
  }
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
  }
});
</script>