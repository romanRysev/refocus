<template>
  <button v-bind="$attrs" :class="colorClass" class="button">
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({ color: String });

const colorClass = computed(() => {
  return props.color === "primary"
    ? "button_color_primary"
    : "button_color_secondary";
});
</script>
<style lang="scss">
@import "src/assets/variables.scss";
.button {
  border: none;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  &_color_primary {
    background-color: $button-primary;
    color: $button-primary-text;
  }

  &_color_secondary {
    background-color: $button-secondary;
    color: $button-secondary-text;
  }
}
</style>
