import { defineStore } from 'pinia'

interface IModalStore {
  show: boolean
  id: number | null
}

export const useModalStore = defineStore('modals', {
  state(): IModalStore {
    return { show: false, id: null }
  },
  actions: {
    setModal({ show, id }: IModalStore) {
      this.show = show
      this.id = id
    }
  }
})
