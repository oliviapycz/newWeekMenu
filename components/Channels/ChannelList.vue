<template>
  <section>
    <ChannelPreview
      v-for="channel in channels"
      :id="channel.id"
      :key="channel.id"
      :title="channel.title"
      :menu-id="channel.menuId"
      :users-id="channel.usersId"
    />
  </section>
</template>

<script>
import ChannelPreview from '@/components/Channels/ChannelPreview'

export default {
  components: {
    ChannelPreview
  },
  props: {
    channels: {
      type: Array,
      required: true
    }
  }
}
</script>
