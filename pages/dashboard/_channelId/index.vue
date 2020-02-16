<template>
  <div>
    <div>
      <h1>
        {{ channelId }}
      </h1>
    </div>
    <section>
      <h2>
        This Week on the Menu
      </h2>
      <div class="color-container">
        <div class="color-container-item">
          <div class="color-red color" />
          <p class="color-description">
            passé
          </p>
        </div>

        <div class="color-container-item">
          <div class="color-blue color" />
          <p class="color-description">
            aujourd'hui
          </p>
        </div>

        <div class="color-container-item">
          <div class="color-green color" />
          <p class="color-description">
            à venir
          </p>
        </div>
      </div>
      <MenuList
        v-if="!showModal"
        :menus="loadedMenus"
        @update-menu="menuToUpdate"
      />
      <div v-if="showModal" class="showModal">
        <MenuUpdate
          :update-menu="loadedDay"
          :index="loadedIndex"
          @show-modal="toggleModal"
          @save-update="updateDailyMenu"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
  data () {
    return {
      showModal: false,
      loadedDay: '',
      loadedIndex: 0
    }
  },
  computed: {
    channelId () {
      return this.$route.query.channel
    },
    loadedMenus () {
      return this.$store.getters.loadedMenus
    }
  },
  asyncData (context) {
    return context.store.dispatch('getMenu', context.query.menu)
  },
  methods: {
    toggleModal (boolean) {
      this.showModal = boolean
    },
    menuToUpdate (index) {
      this.showModal = true
      this.loadedDay = { ...this.loadedMenus[index] }
      this.loadedIndex = index
    },
    updateDailyMenu (dailyMenuToUpdate, IndexToUpdate) {
      this.loadedMenus[IndexToUpdate] = dailyMenuToUpdate
      this.$store.dispatch('updateMenu', {
        menuId: this.$route.query.menu,
        updatedMenu: this.loadedMenus
      })
    }
  }
}
</script>

<style>
.border {
  border: 2px solid;
}
.border-color-red {
  border-color: #B91820;
}
.border-color-blue {
  border-color: blue;
}
.border-color-green {
  border-color: #02CD96;
}
.color {
  width: 30px;
  height: 15px;
  margin-right: 5px;
  border-radius: 2px;
}
.color-description {
  font-size: 12px;
}
.color-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0.5em;
}
.color-container-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.color-red {
  background-color: #B91820;
}
.color-blue {
  background-color: blue;
}
.color-green {
  background-color: #02CD96;
}
.showModal {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}
.modal-container {
    background-color: white;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
}
.button-wrapper {
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  bottom: 0;
  margin-bottom: 0.5em;
}
.ul-container {
  padding-right: 25px;
}
.ul-container li div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.ul-container li div input {
  max-width: 220px;
}
.width {
  width: 90%;
}
.card {
  margin: 1em;
  min-height: 250px;
}
.title {
  text-align: center;
  padding: 10px 16px 0 16px;
  margin: 0 !important;
}
.title h4 {
  font-size: 22px;
}
h4, p {
  margin: 0;
}
.subtitle {
  text-align: center;
  padding: 10px 16px 0 16px;
  margin-bottom: 0 !important;
}
.subtitle span {
  font-size: 18px;
}
ul {
  padding-left: 25px;
}
li {
  list-style-type: none;
  padding-bottom: 5px;
}
.btn-add-md {
  background-color: #444BED;
  color: #fff;
  float: right;
  margin: 0 10px 10px 10px;
}
.btn-add {
  margin-top: 5px;
}
.main-card {
  padding-bottom: inherit;
}
.main-card p {
  font-size: 16px;
}
.modal ul {
  padding: inherit;
}
.modal-main-card {
  padding-left: 5px;
  padding-right: 5px;
}
.btn__action {
  display: flex;
  justify-content: space-around;
}
.btn {
  border-radius: 20px;
  margin: 10px 0px;;
  padding: 4px 20px;
}
.input-update {
  display: flex;
  justify-content: space-between;
}

</style>
