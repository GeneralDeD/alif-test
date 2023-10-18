<script setup lang="ts">
import { useModalStore } from '@/stores/modals'
import { useQuoteStore } from '@/stores/quotes'
import { useToastStore } from '@/stores/toast'

const modalStore = useModalStore()
const { setModal } = modalStore

const { deleteQuote } = useQuoteStore()
const { setToast } = useToastStore()

const handleClose = () => setModal({ show: false, id: null })
const handleDelete = () => {
  if (modalStore.id) {
    deleteQuote(modalStore.id)
    handleClose()
    setToast({ show: true, color: 'green', message: 'Quote deleted successfully' })
  }
}
</script>

<template>
  <v-dialog v-model="modalStore.show" max-width="500px">
    <v-card>
      <div class="card__header">Are you sure to delete this quote?</div>
      <v-card-actions class="card__footer">
        <v-btn color="gray" variant="tonal" size="large" @click="handleClose">Cancel</v-btn>
        <v-btn color="red" variant="elevated" size="large" @click="handleDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.card__header {
  @apply p-5 text-xl font-bold text-center;
}

.card__footer {
  @apply p-5 justify-end;
}
</style>
