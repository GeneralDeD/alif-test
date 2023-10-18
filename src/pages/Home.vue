<script setup lang="ts">
import { useRouter } from 'vue-router'

import Container from '@/components/Container.vue'
import DeleteQuote from '@/components/DeleteQuote.vue'
import EmptyQuotes from '@/components/EmptyQuotes.vue'
import QuoteItem from '@/components/QuoteItem.vue'
import SearchQuote from '@/components/SearchQuote.vue'

import { LINKS } from '@/consts'
import { useQuoteStore } from '@/stores/quotes'

const router = useRouter()
const quoteStore = useQuoteStore()
</script>

<template>
  <main>
    <Container>
      <h1>Quote List</h1>

      <div class="flex items-center gap-5">
        <SearchQuote />
        <v-btn color="blue-darken-4" size="x-large" @click="router.push(LINKS.CREATE_QUOTE)"
          >Create</v-btn
        >
      </div>
    </Container>
    <Container>
      <EmptyQuotes
        v-if="!quoteStore.getFilteredData.length"
        :text="
          quoteStore.filters?.search
            ? 'There is no quotes suitable this filter'
            : 'There is no quotes. You can click to `Create` button to add new quote'
        "
      />
      <div v-else class="flex flex-col gap-5">
        <QuoteItem
          v-for="quote of quoteStore.getFilteredData"
          :key="quote.id"
          :id="quote.id"
          :text="quote.text"
          :author="quote.author"
          :genres="quote.genres"
          :created-at="quote.createdAt"
          :updated-at="quote.updatedAt"
        />
      </div>
    </Container>
  </main>

  <DeleteQuote />
</template>
