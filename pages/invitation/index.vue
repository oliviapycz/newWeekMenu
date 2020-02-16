<template>
  <div>
    <h1>
      You've been invited to join WeekMenu
    </h1>
    <section>
      <nuxt-link to="/register">
        register
      </nuxt-link>
      <nuxt-link to="/login">
        login
      </nuxt-link>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoggedIn: false
    }
  },
  created () {
    if (this.$route.query.channelId) {
      const channelId = this.$route.query.channelId
      this.$store.dispatch('joinChannelInvitation', channelId)
        .then(() => {
          if (this.$store.getters.user) {
            const userId = this.$store.getters.user.userId
            this.$store.dispatch('addChannelId', { userId, channelId })
              .then(() => {
                this.$router.push('/dashboard')
              })
          }
        })
    }
  }
}
</script>
