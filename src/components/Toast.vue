<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const { setToast } = toastStore

const handleClose = () => setToast({ show: false })
</script>

<template>
  <v-snackbar v-model="toastStore.show" :color="toastStore.color">
    {{ toastStore.message }}

    <template v-slot:actions>
      <v-btn color="gray" variant="text" @click="handleClose">Close</v-btn>
    </template>
  </v-snackbar>
</template>
