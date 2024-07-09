<template>
  <div class="navbar p-4 text-lg text-salmon">
    <SignUp v-if="!userExist"/>
    <div v-else>
      <div class="navbar flex justify-between items-center p-4 text-lg text-salmon">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button class="btn btn-outline">账户管理</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuGroup>
              <a href="/account">
                <DropdownMenuItem>
                    <span>个人资料</span>
                </DropdownMenuItem>
              </a>
              <form method="post">
                <input hidden name="operation" value="logout">
                <button class="w-full" type="submit">
                  <DropdownMenuItem>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <a href="/history">
          <button class="profile-icon text-lg text-salmon">
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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const props = defineProps({
  userExist: {
    type: Boolean,
    required: true
  }
});
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
