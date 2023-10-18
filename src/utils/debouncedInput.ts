export const debouncedInput = (func: any, delay: number) => {
  let timeoutId: number
  return (...args: any) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
