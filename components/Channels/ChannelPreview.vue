<template>
  <nuxt-link :to="'/dashboard/' + id + '?channel=' + title + '&menu=' + menuId">
    <article class="channel">
      <h1>{{ title }}</h1>
      <div class="users-container">
        <div v-for="user in usersId" :key="user.index" class="display-users">
          <figure v-if="user !== ''" class="image is-32x32">
            <img class="is-rounded avatar" :src="'https://robohash.org/' + user" alt="avatar">
          </figure>
        </div>
      </div>
      <AppCircleButton
        btn-style="normal absolute-bottom-right"
      >
        <span class="icon" @click="generateUrl(id)">
          <img src="~/static/icons/116-user-plus.png" alt="channel">
        </span>
      </AppCircleButton>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ChannelPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    usersId: {
      type: Array,
      required: true
    },
    menuId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showUrl: false
    }
  },
  methods: {
    async generateUrl (channelId) {
      const url = '/invitation?channelId=' + channelId
      const text = 'you have been invited'
      console.log('navigator', navigator)
      try {
        await navigator.share({
          title: 'weekmenu',
          text,
          url
        })
        console.log('Data was shared successfully')
      } catch (err) {
        console.error('Share failed:', err.message)
      }
      console.log('********URL********', url)
      this.showUrl = true
    }
  }
}
</script>
<style scoped>
.channel {
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 px 6px -6px #777;
  margin: 0.5em;
  min-height: 80px;
  position: relative;
}
.channel > h1 {
  margin-left: 0.5em;
  font-size: 22px;
  color: black;
}

</style>
