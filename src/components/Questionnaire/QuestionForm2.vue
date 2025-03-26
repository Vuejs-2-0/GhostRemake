<template>
  <div class="w-full bg-white rounded-lg">
    <!-- Birth Date/Time Selection Step -->
    <div v-if="!showQuestions" class="p-4">
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">填写生辰</h2>
        
        <!-- Date Selection -->
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">年</label>
            <select v-model="birthYear" class="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">选择年份</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">月</label>
            <select v-model="birthMonth" class="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">选择月份</option>
              <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">日</label>
            <select v-model="birthDay" class="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">选择日期</option>
              <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>
        </div>

        <!-- Gender Selection -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
          <select v-model="gender" class="w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">选择性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>

        <!-- Time Selection -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-gray-700">出生时间</label>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-700">不详</span>
              <button
                type="button"
                role="switch"
                :aria-checked="timeUnknown"
                @click="timeUnknown = !timeUnknown"
                :class="[
                  timeUnknown ? 'bg-salmon-500' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-salmon-500 focus:ring-offset-2'
                ]"
              >
                <span
                  :class="[
                    timeUnknown ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  ]"
                />
              </button>
            </div>
          </div>

          <div v-if="!timeUnknown" class="grid grid-cols-3 gap-4">
            <div>
              <select v-model="birthHour" class="w-full rounded-md border border-gray-300 px-3 py-2">
                <option value="">时</option>
                <option v-for="hour in 12" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </div>
            <div>
              <select v-model="birthMinute" class="w-full rounded-md border border-gray-300 px-3 py-2">
                <option value="">分</option>
                <option v-for="minute in 60" :key="minute" :value="minute">{{ minute }}</option>
              </select>
            </div>
            <div>
              <select v-model="birthAmPm" class="w-full rounded-md border border-gray-300 px-3 py-2">
                <option value="">AM/PM</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <Button @click="saveBirthDateTime" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
          <span>下一步</span>
        </Button>
      </div>
    </div>

    <!-- Questions Form -->
    <div v-else>
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
        <div class="flex justify-between gap-4">
          <Button @click="goBack" class="flex-1 py-2 text-gray-700 font-medium rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span>更改生辰</span>
          </Button>
          <div v-if="addQuestionSet" class="flex-1">
            <Button @click="saveQuestions" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
              <span>提交问题</span>
            </Button>
          </div>
          <div v-else class="flex-1">
            <Button @click="editAllQuestion" class="w-full py-2 text-white font-medium rounded-md hover:bg-[#FF3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3300]">
              <span>更新全部问题</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, toRefs, defineProps, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/vue";
import { cart, editQuestionInCart, updateProductBraceletInCart, removeQuestionInCart } from "@/stores/cart";
import { format } from 'date-fns';

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
const showQuestions = ref(false);

// Birth date/time related refs
const birthYear = ref("");
const birthMonth = ref("");
const birthDay = ref("");
const birthHour = ref("");
const birthMinute = ref("");
const birthAmPm = ref("");
const timeUnknown = ref(false);
const gender = ref("");

// Generate years from current year - 100 to current year
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

// Compute days in selected month
const daysInMonth = computed(() => {
  if (!birthYear.value || !birthMonth.value) return [];
  const date = new Date(birthYear.value, birthMonth.value, 0);
  return Array.from({ length: date.getDate() }, (_, i) => i + 1);
});

// Save birth date/time and proceed to questions
const saveBirthDateTime = async () => {
  // Validate required fields
  if (!birthYear.value || !birthMonth.value || !birthDay.value || !gender.value) {
    alert("请填写年、月、日和性别！");
    return;
  }
  
  // Show questions form
  showQuestions.value = true;
};

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

const goBack = () => {
  showQuestions.value = false;
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

  // Add DOB and gender to metadata if available
  if (birthYear.value && birthMonth.value && birthDay.value) {
    const date = new Date(birthYear.value, birthMonth.value - 1, birthDay.value);
    
    // Add time if not unknown and all time fields are selected
    if (!timeUnknown.value && birthHour.value && birthMinute.value && birthAmPm.value) {
      const hour = parseInt(birthHour.value);
      const minute = parseInt(birthMinute.value);
      const isPM = birthAmPm.value === 'PM';
      
      date.setHours(isPM ? hour + 12 : hour, minute);
    }
    
    /// we need dob in YYYY-MM-DD
    cartMetadata.dob = format(date, 'yyyy-MM-dd');
    cartMetadata.birthTime = format(date, 'HH:mm:ss');
    cartMetadata.gender = gender.value;
  }

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
    
    // Restore DOB values if they exist
    if ($cart.value.metadata.dob) {
      const date = new Date($cart.value.metadata.dob);
      birthYear.value = date.getFullYear();
      birthMonth.value = date.getMonth() + 1;
      birthDay.value = date.getDate();
      
      // Check if time exists
      if (date.getHours() !== 0 || date.getMinutes() !== 0) {
        timeUnknown.value = false;
        const hours = date.getHours();
        const isPM = hours >= 12;
        birthHour.value = isPM ? hours - 12 : hours;
        birthMinute.value = date.getMinutes();
        birthAmPm.value = isPM ? 'PM' : 'AM';
      } else {
        timeUnknown.value = true;
      }
    }
    
    // Restore gender if it exists
    if ($cart.value.metadata.gender) {
      gender.value = $cart.value.metadata.gender;
    }
    
    // Only show questions if we're in edit mode
    if (props.operation === 'edit') {
      showQuestions.value = true;
    }
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