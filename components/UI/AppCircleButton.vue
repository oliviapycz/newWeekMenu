<template>
  <button
    class="button-circle"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppCircleButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button-circle {
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
}
.absolute-bottom-right {
  z-index: 1000;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.relative-below {
  position: relative;
}
.small {
  width: 32px;
  height: 32px;
}
.normal {
  width: 45px;
  height: 45px;
}
/* .button {
  font: inherit;
  background-color: black;
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 1px solid black;
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

.cancel {
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
} */
</style>
