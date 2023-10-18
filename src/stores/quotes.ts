import { defineStore } from 'pinia'

import type { IFilter, IQuote } from '@/types'

interface IQuoteStore {
  filters: IFilter
  quotes: IQuote[]
}

export const useQuoteStore = defineStore('quotes', {
  state(): IQuoteStore {
    return {
      filters: {},
      quotes: [
        {
          id: 1,
          author: 'Cherie Gilderbloom',
          text: 'The best dreams happen when you’re awake.',
          genres: ['Philosophical'],
          createdAt: '18th October 2023, 21:30:27',
          updatedAt: '18th October 2023, 21:33:39'
        },
        {
          id: 2,
          author: 'John Key',
          text: 'You only get out what you put in',
          genres: ['Motivational'],
          createdAt: '18th October 2023, 21:40:58',
          updatedAt: '18th October 2023, 21:40:58'
        }
      ]
    }
  },
  actions: {
    getOneQuote(id: number) {
      console.log(id)
      return this.quotes.find((quote) => quote.id === id)
    },
    setFilters(filters: IFilter) {
      this.filters = filters
    },
    createQuote(quote: IQuote) {
      this.quotes.push(quote)
      return { status: 'success', message: 'Quote added successfully' }
    },
    editQuote(id: number, quote: Pick<IQuote, 'author' | 'text' | 'genres' | 'updatedAt'>) {
      const index = this.quotes.findIndex((quote) => quote.id === id)
      console.log('index2222', index)
      if (index !== -1) {
        this.quotes[index].author = quote.author
        this.quotes[index].text = quote.text
        this.quotes[index].genres = quote.genres
        this.quotes[index].updatedAt = quote.updatedAt
        return { status: 'success', message: 'Quote edited successfully' }
      }
      return { status: 'error', message: 'Something get wrong, please check all variables' }
    },
    deleteQuote(id: number) {
      this.quotes = this.quotes.filter((quote) => quote.id !== id)
    }
  },
  getters: {
    getFilteredData(): IQuote[] {
      const { search } = this.filters

      if (!search?.length) return this.quotes

      const lowerCaseSearch = search.toLowerCase()
      return this.quotes.filter(
        (quote) =>
          quote.text.toLowerCase().includes(lowerCaseSearch) ||
          quote.author.toLowerCase().includes(lowerCaseSearch)
      )
    },
    getQuotesLength(): number {
      return this.quotes.length
    }
  },
  persist: true
})
