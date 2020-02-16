<template>
  <section>
    <div class="modal-container">
      <div class="title">
        <h4>{{ updateTmpMenu.day.toUpperCase() }}</h4>
      </div>
      <div v-if="updateTmpMenu.meal.lunch.menu.length > 0" class="subtitle">
        <span slot="subtitle">{{ updateTmpMenu.meal.lunch.daytime }}</span>
      </div>
      <div v-if="updateTmpMenu.meal.lunch.menu.length > 0">
        <ul class="ul-container">
          <li
            v-for="f in updateTmpMenu.meal.lunch.menu"
            :key="updateTmpMenu.meal.lunch.menu.indexOf(f)"
          >
            <div>
              <!-- <AppControlInput /> -->
              <input
                class="input"
                :value="f"
                @blur="(newVal) => {
                  i = updateTmpMenu.meal.lunch.menu.indexOf(f)
                  f = newVal
                  daytime = 'lunch'
                  updateInput(newVal.target.value, i, daytime)}"
              >
              <AppCrossButton
                v-if="updateTmpMenu.meal.lunch.menu.length > 1"
              >
                <span
                  class="icon"
                  @click="() => {
                    i = updateTmpMenu.meal.lunch.menu.indexOf(f)
                    f
                    daytime = 'lunch'
                    deleteInput(f, i, daytime)}"
                >
                  <img
                    src="~/static/icons/delete.png"
                    alt="delete"
                    style="width:16px; height:16px"
                  >
                </span>
              </AppCrossButton>
            </div>
          </li>
          <AppCircleButton
            btn-style="small relative-below"
          >
            <span
              class="icon"
              @click="() => {
                daytime = 'lunch'
                addInput(daytime)}"
            >
              <img src="~/static/icons/267-plus.png" alt="add">
            </span>
          </AppCircleButton>
        </ul>
      </div>

      <div v-if="updateTmpMenu.meal.diner.menu.length > 0" class="subtitle">
        <span slot="subtitle">{{ updateMenu.meal.diner.daytime }}</span>
      </div>
      <div v-if="updateTmpMenu.meal.diner.menu.length > 0">
        <ul class="ul-container">
          <li
            v-for="f in updateTmpMenu.meal.diner.menu"
            :key="updateTmpMenu.meal.diner.menu.indexOf(f)"
          >
            <div>
              <input
                class="input"
                :value="f"
                @blur.prevent="(newVal) => {
                  i = updateTmpMenu.meal.diner.menu.indexOf(f)
                  f = newVal
                  daytime = 'diner'
                  updateInput(newVal.target.value, i, daytime)}"
              >
              <AppCrossButton
                v-if="updateTmpMenu.meal.diner.menu.length > 1"
              >
                <span
                  class="icon"
                  @click="() => {
                    i = updateTmpMenu.meal.diner.menu.indexOf(f)
                    f
                    daytime = 'diner'
                    deleteInput(f, i, daytime)}"
                >
                  <img
                    src="~/static/icons/delete.png"
                    alt="delete"
                    style="width:16px; height:16px"
                  >
                </span>
              </AppCrossButton>
            </div>
          </li>
          <AppCircleButton
            btn-style="small relative-below"
          >
            <span
              class="icon"
              @click="() => {
                daytime = 'diner'
                addInput(daytime)}"
            >
              <img src="~/static/icons/267-plus.png" alt="add">
            </span>
          </AppCircleButton>
        </ul>
        <p v-if="errorMessage">
          {{ errorMessage }}
        </p>
      </div>
    </div>
    <div class="button-wrapper">
      <AppRectangleButton
        type="submit"
        btn-style="save"
        @click="updateDailyMenu(updateTmpMenu, index)"
      >
        SAVE
      </AppRectangleButton>
      <AppRectangleButton
        type="submit"
        btn-style="cancel"
        @click="cancelUpdateDailyMenu()"
      >
        CANCEL
      </AppRectangleButton>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    updateMenu: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      errorMessage: '',
      updateTmpMenu: {}
    }
  },
  beforeMount () {
    // this.updateTmpMenu = { ...this.updateMenu }
    this.updateTmpMenu = JSON.parse(JSON.stringify(this.updateMenu))
    console.log('indexxxxxxxxxxx', this.index)
    console.log('updateMenu', this.updateMenu.meal.lunch.menu)
    console.log('updateTmpMenu', this.updateTmpMenu.meal.lunch.menu)
  },
  methods: {
    addInput (meal) {
      if ((this.updateTmpMenu.meal.lunch.menu[this.updateTmpMenu.meal.lunch.menu.length - 1] === '') ||
      (this.updateTmpMenu.meal.diner.menu[this.updateTmpMenu.meal.diner.menu.length - 1] === '')) {
        this.errorMessage = 'you can\'t add a new input if the last one is empty'
        return this.errorMessage
      }
      /*eslint-disable*/
      if (meal === 'lunch') {
        this.updateTmpMenu.meal.lunch.menu.push('')
      }
      if (meal === 'diner') {
        this.updateTmpMenu.meal.diner.menu.push('')
      }
      /*eslint-disable*/
      console.log('RES this.updateTmpMenu addInput', this.updateTmpMenu.meal.lunch.menu)
      console.log('RES this.updateMenu addInput', this.updateMenu.meal.lunch.menu)
      // this.$emit('updated-menu', this.updateTmpMenu)
    },
    updateInput (el, key, meal) {
      console.log('[******updateInput el, key, meal********]', {el, key, meal})
      /*eslint-disable*/
      if (meal === 'lunch') {
        for (let index = 0; index < this.updateTmpMenu.meal.lunch.menu.length; index++) {
          if (index === key) {
            this.updateTmpMenu.meal.lunch.menu[key] = el
          }
        }
      } else {
        for (let index = 0; index < this.updateTmpMenu.meal.diner.menu.length; index++) {
          if (index === key) {
            this.updateTmpMenu.meal.diner.menu[key] = el
          }
        }
      }
      /*eslint-disable*/
      console.log('RES this.updateTmpMenu updateInput', this.updateTmpMenu)
      console.log('RES this.updateMenu updateInput', this.updateMenu)
      // this.$emit('updated-menu', this.updateTmpMenu)
      this.errorMessage = ''
    },
    deleteInput(el, key, meal) {
      console.log('[******deleteInput el, key, meal********]', {el, key, meal})
      /*eslint-disable*/
      if (meal === 'lunch') {
        for (let index = 0; index < this.updateTmpMenu.meal.lunch.menu.length; index++) {
          if (index === key) {
            this.updateTmpMenu.meal.lunch.menu.splice(index, 1)
          }
        }
      }
      if (meal === 'diner') {
        for (let index = 0; index < this.updateTmpMenu.meal.diner.menu.length; index++) {
          if (index === key) {
            this.updateTmpMenu.meal.diner.menu.splice(index, 1)
          }
        }
      }
      /*eslint-disable*/
      console.log('RES this.updateTmpMenu deleteInput', this.updateTmpMenu)
      // this.$emit('updated-menu', this.updateTmpMenu)
    },
    updateDailyMenu (el) {
      console.log('[*********_channelId index method updateDailyMenu PARAM EL***********]', el)
      if (el.meal.lunch.menu[el.meal.lunch.menu.length - 1] === '' && el.meal.lunch.menu.length > 1) {
        el.meal.lunch.menu.pop()
      }
      if (el.meal.diner.menu[el.meal.diner.menu.length - 1] === '' && el.meal.lunch.menu.length > 1) {
        el.meal.diner.menu.pop()
      }
      this.$emit('save-update', el, this.index)
      this.$emit('show-modal', false)
    },
    cancelUpdateDailyMenu () {
      this.$emit('show-modal', false)
    }
  }
}
</script>
