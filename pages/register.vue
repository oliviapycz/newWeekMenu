<template>
  <section class="section">
    <div class="container">
      <div class="column is-full-mobile is-two-thirds-tablet is-half-desktop">
        <h2 class="title has-text-centered">
          Register
        </h2>

        <form method="post" @submit.prevent="register">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                v-model="username"
                type="text"
                name="username"
                class="input"
                required
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="email"
                type="email"
                name="email"
                class="input"
                required
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="password"
                type="password"
                name="password"
                class="input"
                required
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input
                v-model="confirmPassword"
                type="password"
                name="confirmPassword"
                class="input"
                required
              >
            </div>
          </div>
          <div class="control">
            <button type="submit" class="button is-dark is-fullwidth">
              Register
            </button>
          </div>
          <!-- <div class="control">
            <button class="button is-dark is-fullwidth" @click="facebook">
              Login with Facebook
            </button>
          </div> -->
        </form>

        <div class="has-text-centered" style="margin-top: 20px">
          Already got an account?
          <nuxt-link to="/login">
            Login
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {

  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },

  methods: {
    register () {
      this.$store.dispatch('authenticateUser', {
        page: 'register',
        displayName: this.username,
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/dashboard')
        })
    },
    facebook () {
      this.$auth.loginWith('facebook')
        .then(() => {
          this.$router.push('/dashboard')
        })
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
</style>
