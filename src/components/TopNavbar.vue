<template>
  <div class="navbar p-4 text-lg text-[#B551F3]">
    <SignUp v-if="!userExist"/>
    <div v-else>
      <div class="navbar flex justify-between items-center p-4 text-lg text-[#B551F3]">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="btn btn-outline">账户管理</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>账户设定</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button @click="submitLogout">Logout</button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <form ref="logoutForm" method="post">
          <input hidden name="operation" value="logout">
        </form>
        <a href="/history">
          <button class="profile-icon text-lg text-[#B551F3]">
            <p>购买记录</p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import SignUp from './SignUp2.vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const props = defineProps({
  user: {
    type: String,
    required: true
  }
});
const userExist = ref(false);

onMounted(() => {
  if (props.user.substring(0, 5) === "guest") {
    userExist.value = false;
  } else {
    userExist.value = true;
  }
});

const submitLogout = () => {
  logoutForm.value.submit();
  console.log("logout");
};
</script>

<style scoped>
.container {
  max-width: 375px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }
}
</style>