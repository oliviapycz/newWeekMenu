<template>
  <section class="section">
    <div class="container">
      <div class="column is-full-mobile is-two-thirds-tablet is-half-desktop">
        <h2 class="title has-text-centered">
          Login
        </h2>

        <form method="post" @submit.prevent="login">
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
          <div class="control">
            <button type="submit" class="button is-dark is-fullwidth">
              Login
            </button>
          </div>
          <!-- <div class="control">
            <button class="button is-dark is-fullwidth" @click="facebook">
              Login with Facebook
            </button>
          </div> -->
        </form>
      </div>
    </div>
  </section>
</template>

<script>

export default {

  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    login () {
      this.$store.dispatch('authenticateUser', {
        page: 'login',
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
