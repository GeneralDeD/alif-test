<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import QuoteInfo from '@/components/QuoteInfo.vue'

import { LINKS } from '@/consts'
import { useQuoteStore } from '@/stores/quotes'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()

const { getOneQuote } = useQuoteStore()
const { setToast } = useToastStore()

const id = route.params.id
const checkedQuote = computed(() => getOneQuote(+id))

if (!isFinite(+id) || !checkedQuote?.value) {
  setToast({ show: true, color: 'red', message: `There is no quote with id = ${id}` })
  router.push(LINKS.HOME)
}
</script>

<template>
  <QuoteInfo :checkedQuote="checkedQuote" />
</template>
