export const lettersOnly = (value: string) => {
  return /^[A-Za-zА-Яа-я\s]+$/.test(value)
}
