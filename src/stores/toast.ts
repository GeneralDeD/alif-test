import { defineStore } from 'pinia'

interface IToastStore {
  show: boolean
  message?: string
  color?: string
}

export const useToastStore = defineStore('toast', {
  state(): IToastStore {
    return { show: false }
  },
  actions: {
    setToast({ show, message, color }: IToastStore) {
      this.show = show
      this.message = message
      this.color = color
    }
  }
})
