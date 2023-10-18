<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

import BreadCrumbs from './BreadCrumbs.vue'
import Container from './Container.vue'

import { LINKS, QUOTE_GENRES } from '@/consts'
import { useQuoteStore } from '@/stores/quotes'
import { useToastStore } from '@/stores/toast'
import type { IQuote } from '@/types'
import { lettersOnly } from '@/utils'

const { checkedQuote } = defineProps({
  checkedQuote: {
    type: Object,
    required: false
  }
}) as { checkedQuote?: IQuote }
const isEdit = !!checkedQuote
const title = isEdit ? 'Edit' : 'Create'
const color = isEdit ? 'yellow' : 'blue-darken-4'

const router = useRouter()
const formItem = reactive<Pick<IQuote, 'author' | 'text' | 'genres'>>({
  author: '',
  text: '',
  genres: []
})

const { getQuotesLength, createQuote, editQuote } = useQuoteStore()
const { setToast } = useToastStore()

if (isEdit) {
  formItem.author = checkedQuote.author
  formItem.text = checkedQuote.text
  formItem.genres.push(...checkedQuote.genres)
}

const handleSubmit = (event: Event) => {
  event.preventDefault()

  if (!lettersOnly(formItem.author)) {
    setToast({
      show: true,
      color: 'red',
      message: "Please check the author's name. It must contain only letters!"
    })
    return
  }

  const data: Pick<IQuote, 'author' | 'text' | 'genres'> = {
    author: formItem.author,
    text: formItem.text,
    genres: [...formItem.genres]
  }
  const date = moment().format('Do MMMM YYYY, HH:mm:ss')

  if (isEdit) {
    const response = editQuote(checkedQuote.id, { ...data, updatedAt: date })
    if (response.status === 'success') {
      setToast({ show: true, color: 'green', message: response.message })
      router.push(LINKS.HOME)
      return
    }
    setToast({ show: true, color: 'red', message: response.message })
    return
  }

  const response = createQuote({
    ...data,
    id: getQuotesLength + 1,
    createdAt: date,
    updatedAt: date
  })
  setToast({ show: true, color: 'green', message: response.message })
  router.push(LINKS.HOME)
}
</script>

<template>
  <Container>
    <BreadCrumbs :data="[{ title: `${title} Quote` }]" />

    <h1>{{ title }} Quote</h1>

    <form @submit="handleSubmit">
      <v-text-field
        label="Author"
        v-model="formItem.author"
        type="text"
        placeholder="William Shakespeare"
        variant="outlined"
        color="blue-darken-4"
        required
      ></v-text-field>
      <v-text-field
        label="Text"
        v-model="formItem.text"
        type="textarea"
        placeholder="To be, or not to be: that is the question."
        variant="outlined"
        color="blue-darken-4"
        required
      ></v-text-field>
      <v-select
        clearable
        chips
        label="Genre"
        v-model="formItem.genres"
        :items="QUOTE_GENRES"
        multiple
        variant="outlined"
        color="blue-darken-4"
        required
      >
        ></v-select
      >
      <div class="flex items-center justify-end gap-3">
        <v-btn
          type="button"
          variant="tonal"
          color="gray"
          size="large"
          @click="() => router.push('/')"
          >Cancel</v-btn
        >
        <v-btn type="submit" :color="color" size="large">{{ title }}</v-btn>
      </div>
    </form>
  </Container>
</template>

<style scoped lang="scss"></style>
