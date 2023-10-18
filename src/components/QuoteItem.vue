<script setup lang="ts">
import { useRouter } from 'vue-router'

import IconEdit from './icons/IconEdit.vue'
import IconDelete from './icons/IconDelete.vue'

import { LINKS } from '@/consts'
import { useModalStore } from '@/stores/modals'

const router = useRouter()
const { setModal } = useModalStore()

const { id, text, author, updatedAt } = defineProps({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  genres: { type: Array<string>, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
})
</script>

<template>
  <section>
    <blockquote>
      <p>{{ text }}</p>
      <div class="genres">Genre: {{ genres.join(', ') }}</div>
      <div class="actions">
        <button @click="router.push(`${LINKS.HOME}${id}`)"><IconEdit /></button>
        <button @click="setModal({ show: true, id })"><IconDelete /></button>
      </div>
      <footer>
        <cite>{{ author }}</cite>
        <div>
          <small>Created: {{ createdAt }}</small>
          <small>Last mod: {{ updatedAt }}</small>
        </div>
      </footer>
    </blockquote>
  </section>
</template>

<style scoped lang="scss">
section {
  @apply relative bg-teal-300 w-full;

  blockquote {
    @apply py-10 pl-10 pr-5 border-l-8 border-white md:pl-24 xl:pl-[130px];

    &::before {
      @apply hidden absolute content-["\201C"] w-10 h-10 bg-white rounded-full top-7 left-7 text-4xl leading-[inherit] md:flex md:justify-center xl:top-8 xl:left-10;
    }

    &::after {
      @apply hidden absolute content-[''] w-2 top-5 bottom-5 left-20 bg-white md:block xl:top-8 xl:left-[105px];
    }

    p {
      @apply mb-4 text-2xl font-thin;
    }

    .genres {
      @apply flex items-center gap-3 text-gray-500;
    }

    .actions {
      @apply absolute top-5 right-5 flex gap-3;
    }

    footer {
      @apply flex items-start justify-between flex-wrap gap-x-5 gap-y-2;

      cite {
        @apply relative text-lg pl-5;

        &::before {
          @apply absolute content-['—'] left-0;
        }
      }

      div {
        @apply flex flex-col gap-1 sm:text-right;

        small {
          @apply text-gray-500;
        }
      }
    }
  }
}
</style>
