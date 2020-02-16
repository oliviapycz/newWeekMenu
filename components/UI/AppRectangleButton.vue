<template>
  <button
    class="button"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppRectangleButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button {
  font: inherit;
  background-color: black;
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 1px solid black;
  min-width: 120px;
}

.button:hover,
.button:active {
  background-color: rgb(51, 51, 51);
  border: 1px solid black;
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}
.save {
  background-color: #02CD96;
  color: white;
  border: 1px solid transparent;
}
.cancel {
  background-color: #B91820;
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}
</style>
