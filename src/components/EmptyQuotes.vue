<script setup lang="ts">
const { text } = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="emptyQuotes">
    {{ text }}
  </div>
</template>

<style scoped lang="scss">
.emptyQuotes {
  @apply w-fit mx-auto py-10 text-xl;
}
</style>
