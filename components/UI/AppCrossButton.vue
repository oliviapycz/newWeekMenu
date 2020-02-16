<template>
  <button
    class="button-cross"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppCrossButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button-cross {
  border: none;
  background-color: white;
}
</style>
