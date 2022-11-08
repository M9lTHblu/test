import onChange from 'on-change'
import View from './View.js'
import { getCards } from './data.js'
import {
  sortByDateDown,
  sortByDateUp,
  sortByPriceDown,
  sortByPriceUp,
} from './helpers/sort.js'

export default () => {
  const state = {
    items: getCards(),
    sortSelect: {
      value: 'by-date-up',
      isOpen: false,
    },
  }

  const view = new View(state)
  view.init()

  // watcher
  const watchedState = onChange(state, () => {
      view.render(state)
    })

  // sort select
  const sortSelect = view.sort
  const toggle = sortSelect.toggle
  const options = sortSelect.options

  const handleToggleClick = () => {
    const { sortSelect } = watchedState
    sortSelect.isOpen = !sortSelect.isOpen
  }

  const handleOptionClick = (e) => {
    const { sortSelect, items } = watchedState
    const optionValue = e.target.dataset.optionValue
    sortSelect.value = optionValue
    sortSelect.isOpen = false
    switch (optionValue) {
      case 'by-date-up':
        watchedState.items = sortByDateUp(items)
        break
      case 'by-date-down':
        watchedState.items = sortByDateDown(items)
        break
      case 'by-price-up':
        watchedState.items = sortByPriceUp(items)
        break
      case 'by-price-down':
        watchedState.items = sortByPriceDown(items)
    }
  }

  toggle.addEventListener('click', handleToggleClick)
  options.addEventListener('click', handleOptionClick)
}
