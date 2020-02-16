<template>
  <div>
    <p>create a new channel:</p>
    <form method="post" @submit.prevent="createNewChannel">
      <div class="field">
        <label class="label">title</label>
        <div class="control">
          <input
            v-model="title"
            type="text"
            name="title"
            class="input"
            required
          >
        </div>
      </div>
      <div class="control">
        <AppRectangleButton
          type="submit"
          style="margin-left: 10px"
          btn-style="cancel"
        >
          New Channel
        </AppRectangleButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    createNewChannel () {
      this.$store.dispatch('createNewChannel', {
        title: this.title,
        userId: this.$store.getters.user.userId
      })
        .then(() => {
          this.$router.push('/dashboard')
        })
    }
  }
}
</script>
