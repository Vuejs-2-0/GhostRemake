<template>
<div v-if="questionExist">
  <a :href="messengerLink" class="w-full">
    <Button class="hover:scale-105 w-full text-xl bg-[#3B4DB3] rounded-2xl min-h-0 h-auto 
      hover:bg-[#4d5fcd] border-4 border-[#475cd3] ring-2 ring-[#5b6edd] 
      shadow-2xl shadow-[#2b3a8e]/50 duration-300 transition-all 
      scale-100 active:scale-95 p-3">
      <span class="text-white">前往「脸书联系」</span>
    </Button>
  </a>
</div>
  
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { ref, toRefs, watchEffect, onMounted } from 'vue';

const props = defineProps(['tx']);
const { tx } = toRefs(props);
const questionExist = ref(false);
const questionList = ref([]); // 问事列表
const messengerLink = ref(''); // Link to send message

let questionCounter = 1; // Initialize a global question counter

// Run the alert on the client side when the component is mounted
onMounted(() => {
  for(let i = 0; i < tx.value.entries.length; i++) {
    if(tx.value.entries[i].metadata.product.name === '问事') {
      questionExist.value = true;
      for(let j = 0; j < tx.value.entries[i].metadata.questionSet.length; j++) {
        const questionNumber = `问题${questionCounter}: `;  // Use the global counter
        const question = tx.value.entries[i].metadata.questionSet[j]
          .replace(/问题\d+:\s*/, '') // Remove prefix
          questionList.value.push(`${questionNumber}${question}`);  // Re-add the prefix
          questionCounter++;  // Increment the global counter
      }

      const order_Id = tx.value.uuid || 'unknown';
      const formattedQuestions = questionList.value.join(''); // Join questions with a semicolon for readability
      const message = `「问事」\nID: ${order_Id}\n\n${formattedQuestions}\n注: 老师得空的时候会回复，请耐心等待`;
      const encodedMessage = encodeURIComponent(message); // Encode the message for the URL
      messengerLink.value = `http://m.me/my.ghost.friend?text=${encodedMessage}`;
      continue;
    }
  }
  if (window.confirm(`基于隐私及权限设定，提问者必须先主动联系主页。 请点击"OK"前往「脸书联系」。`)) 
  {
    window.location.href=`${messengerLink.value}`;
  };
});

// Create the messenger link
watchEffect(() => {
  if (questionExist.value && questionList.value.length > 0) {
    const order_Id = tx.value.uuid || 'unknown';
    const formattedQuestions = questionList.value.join(''); // Join questions with a semicolon for readability
    const message = `「问事」\nID: ${order_Id}\n\n${formattedQuestions}\n注: 老师得空的时候会回复，请耐心等待`;
    const encodedMessage = encodeURIComponent(message); // Encode the message for the URL
    messengerLink.value = `http://m.me/my.ghost.friend?text=${encodedMessage}`;
    // console.log(messengerLink.value);
  } else {
    messengerLink.value = ''; // Clear the link if no questions
  }
});

</script>
