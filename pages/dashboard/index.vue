<template>
  <div>
    <h1>
      Dashboard
    </h1>
    <section>
      <h2>
        Your channels
      </h2>
      <div v-if="loadedChannels">
        <ChannelList :channels="loadedChannels" />
      </div>
      <nuxt-link class="add-channel-container" to="dashboard/new-channel">
        <span class="icon">
          <img src="~/static/icons/267-plus.png" alt="add">
        </span>
        <p>Create a new channel</p>
      </nuxt-link>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
  data () {
    return {
      title: ''
    }
  },
  computed: {
    userEmail () {
      return this.$store.getters.user.email
    },
    loadedChannels () {
      return this.$store.getters.loadedChannels
    }
  }
}
</script>

<style>
.add-channel-container {
  display: flex;
  justify-content: space-around;
  min-height: 60px;
  background-color: lightgray;
  align-items: center;
}
.add-channel-container > p {
  color: black;
}
.users-container{
  display: flex;
  justify-content: flex-start;
}
.display-users {
  display: flex;
}
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
.width {
  width: 90%;
}
.card {
  margin: 1em;
}
.title {
  text-align: center;
  padding: 10px 16px 0 16px;
}
h4, p {
  margin: inherit;
}
.subtitle {
  text-align: center;
  padding: 10px 16px 0 16px;
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
