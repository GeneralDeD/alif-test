<script setup lang="ts">
import { LINKS } from '@/consts'
import type { IBreadcrumb } from '@/types'

const { data } = defineProps({
  data: {
    type: Array<IBreadcrumb>,
    required: false
  }
})
</script>

<template>
  <div class="breadCrumb">
    <div>
      <RouterLink :to="LINKS.HOME" class="underline">Main</RouterLink>
      <span>></span>
    </div>
    <template v-for="item in data" :key="item.title">
      <span v-if="item.link">
        <router-link :to="item.link">{{ item.title }}</router-link>
        <span>></span>
      </span>
      <a v-else>{{ item.title }}</a>
    </template>
  </div>
</template>

<style scoped lang="scss">
.breadCrumb {
  @apply flex gap-2 mb-5;
}

a {
  @apply text-blue-600;
}
span {
  @apply ml-1;
}
</style>
