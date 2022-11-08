export const sortByDateUp = (items) => {
  return items.sort((a,b) => a.date - b.date)
}

export const sortByDateDown = (items) => {
  return items.sort((a,b) => b.date - a.date)
}

export const sortByPriceUp = (items) => {
  return items.sort((a,b) => b.price - a.price)
}
export const sortByPriceDown = (items) => {
  return items.sort((a,b) => a.price - b.price)
}
