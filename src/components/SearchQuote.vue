<script setup lang="ts">
import { useQuoteStore } from '@/stores/quotes'
import { debouncedInput } from '@/utils'

const { setFilters } = useQuoteStore()

const debouncedSearch = debouncedInput((event: InputEvent & { target: HTMLInputElement }) => {
  setFilters({ search: event.target.value })
}, 300)
</script>

<template>
  <v-text-field
    name="Search"
    label="Search"
    placeholder="The best ..."
    variant="outlined"
    clearable
    @input="debouncedSearch"
    @click:clear="setFilters({ search: '' })"
    hide-details="auto"
  ></v-text-field>
</template>
