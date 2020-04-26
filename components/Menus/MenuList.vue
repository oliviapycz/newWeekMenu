<template>
  <section>
    <MenuPreview
      v-for="menu in menus"
      :key="menu.id"
      :day="menu.day"
      :meal="menu.meal"
      :index="menus.indexOf(menu)"
      @update-menu="updateMenu"
    />
  </section>
</template>

<script>
import MenuPreview from '@/components/Menus/MenuPreview'

export default {
  components: {
    MenuPreview
  },
  props: {
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateMenu (index) {
      this.$emit('update-menu', index)
    }
  }
}
</script>
