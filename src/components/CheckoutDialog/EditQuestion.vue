<template>
  <DialogContent class="sm:max-w-[425px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-4 max-h-[90vh] bg-white shadow-lg rounded-lg overflow-y-auto">
    <DialogDescription class="text-lg font-semibold text-gray-700 mb-4">问题列表</DialogDescription>
    <div class="overflow-y-auto">
      <div v-for="(item, index) in questions" :key="index" class="mb-6">
        <p class="text-gray-600 font-medium">问题集 {{ index + 1 }}:</p>
        <ul class="mt-2 space-y-4">
          <li v-for="(question, qIndex) in item.questionArray" :key="qIndex" class="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg shadow-sm">
            <label :for="`question-${qIndex}`" class="text-gray-500">问题 {{ qIndex + 1 }} :</label>
            <div class="flex items-center space-x-4">
              <input :id="`question-${index}-${qIndex}`" :value="question" class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Button @click="editQuestion(index, qIndex)" class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 rounded-lg">更改</Button>
              <Button @click="deleteQuestion(index, qIndex)" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-lg">移除</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </DialogContent>
</template>

<script setup lang="ts">
import { defineProps, toRefs, ref } from 'vue';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { cart, removeQuestionInCart, editQuestionInCart } from '@/stores/cart';
import { useStore } from '@nanostores/vue';
import { Button } from "@/components/ui/button";

const $cart = useStore(cart);
const props = defineProps({
  localCart: Object
});

const { localCart } = toRefs(props);

let existingQuestions = [...(localCart?.value?.metadata.questions || [])];
const questions = ref(existingQuestions);

const editQuestion = async (index: number, qIndex: number) => {
  const value = (document.getElementById(`question-${index}-${qIndex}`) as HTMLInputElement).value;
  let cartMetadata = { ...$cart.value.metadata };
  questions.value[index].questionArray[qIndex] = value;
  cartMetadata.questions = questions.value;
  console.log(cartMetadata);

  await editQuestionInCart(cartMetadata);

  alert("成功更改问题！");
};

const deleteQuestion = async (index: number, qIndex: number) => {
  let cartMetadata = { ...$cart.value.metadata };
  questions.value[index].questionArray.splice(qIndex, 1);
  questions.value[index].questionIndex = questions.value[index].questionArray.length;
  cartMetadata.questions = questions.value;
  console.log(cartMetadata);

  await removeQuestionInCart(cartMetadata);

  alert("成功移除问题！");
};
</script>