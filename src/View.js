import arrowDown from '../assets/icons/select-arrow-down.svg'
import arrowUp from '../assets/icons/select-arrow-up.svg'
import options from '../assets/icons/menu-options.svg'

export default class View {
  constructor (state) {
    this.items = state.items
    this.sortValue = state.sortSelect.value
  }

  init () {
    this.sort = new SortSelect('.sort', this.sortValue)
    this.cards = new Cards('.cards', this.items)
  }

  render (state) {
    const { sortSelect, items } = state
    this.sort.render(sortSelect)
    this.cards.render(items)
  }
}

class Cards {
  constructor (selector, initialData) {
    this.container = document.querySelector(selector)
    this.render(initialData)
  }

  render (items) {
    this.container.innerHTML = items.map((item) => (
      `<li>
          <article class='card'>
              <div class='card__img'></div>
              <span class='card__title'>title: ${item.title}</span>
              <span class='card__price'>price: ${item.price} $</span>
              <span class='card__date'>date: ${item.date}</span>
              <button class='card__options' type='button'>
                <img src='${options}' alt=''>
              </button>
              </div>
          </article>
       </li>`
    )).join('')
  }
}

class SortSelect {
  constructor (selector = '', initialValue = '') {
    this.container = document.querySelector(selector)
    this.toggleBtn = this.container.firstElementChild
    this.optionsList = this.container.lastElementChild
    this.toggleBtnValue = this.toggleBtn.firstElementChild
    this.toggleTicket = this.toggleBtn.lastElementChild
    this.setValue(initialValue)
  }

  get options () {
    return this.optionsList
  }

  get toggle () {
    return this.toggleBtn
  }

  setValue (value) {
    const toggleValues = {
      'by-date-up': `По дате публикации <img src='${arrowUp}' alt=''/>`,
      'by-date-down': `По дате публикации <img src='${arrowDown}' alt=''/>`,
      'by-price-up': `По цене <img src='${arrowUp}' alt=''/>`,
      'by-price-down': `По цене <img src='${arrowDown}' alt=''/>`,
    }
    this.toggleBtnValue.innerHTML = toggleValues[value]
  }

  open (isOpen) {
    if (isOpen) {
      this.optionsList.classList.add('select__option-list_open')
      this.toggleTicket.classList.add('toggle__tick_open')
    } else {
      this.optionsList.classList.remove('select__option-list_open')
      this.toggleTicket.classList.remove('toggle__tick_open')
    }
  }

  render (state) {
    const { isOpen, value } = state
    this.open(isOpen)
    this.setValue(value)
  }
}
