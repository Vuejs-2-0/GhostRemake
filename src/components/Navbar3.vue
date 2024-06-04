<script setup>
import NavGroup from "@/components/NavGroup.vue"
import NavItem from "@/components/NavItem.vue"
import NavList from "@/components/NavList.vue"

const items = ["友鬼系列","五色绳","关于"]

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function navigate(sectionId) {
  // Call scrollToSection with the sectionId from the activated event
  scrollToSection(sectionId);
  // the callback is fired once the animation is completed
  // to allow smooth transition
}
</script>

<template>
    <div class="bg-[#F6EAFF]">
      <div class="max-w-[375px] mx-auto pl-2 pb-3 md:max-w-[600px]">
        <NavGroup
        v-slot="{ ready, size, position, duration }"
        as="nav"
        class="relative mx-auto rounded-2xl bg-white/5 p-4">
            <div class="relative">
                <div
                v-if="ready"
                :style="{
                    '--size': size,
                    '--position': position,
                    '--duration': duration,
                }"
                class="absolute inset-y-0 left-0 h-full w-[--size] translate-x-[--position] rounded-lg bg-white/10 transition-[width,transform] duration-[--duration]" />

                <NavList as="ul" class="relative flex items-center gap-3">
                    <NavItem
                    v-for="(item, index) in items"
                    :key="index"
                    v-slot="{ setActive, isActive }"
                    as="li"
                    @activated="navigate"
                    :section-id="{
                        '友鬼系列': 'mainSection',
                        '五色绳': 'braceletSection',
                        '关于': 'aboutSection',
                    }[item]" 
                    >
                    <a
                        href="#"
                        :class="[isActive ? 'text-black' : 'text-black/60 hover:text-black' ]"
                        class="inline-block px-4 py-1 text-sm transition"
                        @click.prevent="setActive">
                        {{ item }}
                    </a>
                    </NavItem>
                </NavList>
            </div>
        </NavGroup>
      </div>
    </div>
</template>
  
