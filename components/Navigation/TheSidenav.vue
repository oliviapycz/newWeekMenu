<template>
  <div class="sidenav-container">
    <div
      v-if="show"
      class="sidenav-backdrop"
      @click="$emit('close')"
    />
    <transition name="slide-side">
      <div
        v-if="show"
        class="sidenav"
      >
        <div class="top-section">
          <p class="app-title">
            WeekMenu
          </p>
          <div v-if="displayUser" class="user-section">
            <figure class="image is-48x48">
              <img class="is-rounded avatar" :src="'https://robohash.org/' + displayUser.email" alt="avatar">
            </figure>
            <div>
              <p>
                {{ displayUser.username }}
              </p>
              <p>
                {{ displayUser.email }}
              </p>
            </div>
          </div>
        </div>
        <ul
          class="nav-list"
          @click="$emit('close')"
        >
          <li class="nav-item">
            <span class="icon">
              <img src="~/static/icons/001-home.png" alt="home">
            </span>
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </li>
          <li class="nav-item">
            <span class="icon">
              <img src="~/static/icons/032-book.png" alt="recipies">
            </span>
            <nuxt-link to="/recipies">
              Recipies
            </nuxt-link>
          </li>
          <li v-if="displayUser" class="nav-item">
            <span class="icon">
              <img src="~/static/icons/047-stack.png" alt="dashboard">
            </span>
            <nuxt-link to="/dashboard">
              Dashboard
            </nuxt-link>
          </li>
        </ul>
        <section @click="$emit('close')">
          <ChannelList :channels="loadedChannels" />
        </section>
        <ul
          class="nav-list"
          @click="$emit('close')"
        >
          <li class="nav-item">
            <span class="icon">
              <img src="~/static/icons/185-clipboard.png" alt="channel">
            </span>
            <nuxt-link to="/groceries">
              Groceries
            </nuxt-link>
          </li>
        </ul>
        <div class="button-container">
          <div v-if="displayUser">
            <button class="button is-dark" @click="logout">
              Logout
            </button>
          </div>
          <div v-else @click="$emit('close')">
            <nuxt-link to="/register" class="button is-dark">
              Register
            </nuxt-link>
            <nuxt-link to="/login" class="button is-dark">
              Login
            </nuxt-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  middleware: 'check-auth',
  name: 'TheSidenav',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      channels: []
    }
  },
  computed: {
    displayUser () {
      return this.$store.getters.user
    },
    loadedChannels () {
      console.log('loadedChannels', this.$store.getters.loadedChannels)
      return this.$store.getters.loadedChannels
    }
  },
  methods: {
    logout () {
      this.$emit('close')
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-around;
}
.button-container button, .button-container a {
  min-width: 100px;;
}
.channel {
  border: 1px solid lightgray;
  background-color: white;
  box-shadow: 0 px 6px -6px #777;
  margin: 0.5em auto;
  min-height: 80px;
}
.sidenav-container {
  height: 100%;
  width: 100%;
}
.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}
.top-section {
  background-color: #B91820;
  width: 100%;
  height: 100px;
  padding: 10px;
  color: aliceblue;
}
.user-section {
  display: flex;
  justify-content: flex-start;
}
.app-title {
  font-size: 18px;
  margin-bottom: 0.5em;
}
.user-section figure {
  margin-right: 1em;
}
.sidenav {
  height: 100%;
  width: 300px;
  background-color: aliceblue;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
}
.avatar-container {
  border: 2px solid #02CD96;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.avatar {
  background-color: aliceblue;
}
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-item span {
  margin-right: 1em;
}
.nav-item a {
  text-decoration: none;
  color: black;
  font-size: 1rem;
}

.nav-item a:hover,
.nav-item a:active {
  color: red;
}
</style>
