<template>
  <input
    v-bind="$attrs"
    :value="$attrs.modelValue ?? $attrs.value"
    class="input"
    @input.stop="$emit('update:modelValue', $event.target?.value)"
  />
</template>
<style lang="scss">
@import "src/assets/variables.scss";
.input {
  border: 1px solid $input-border;
  border-radius: 5px;
  height: 36px;
  color: $input-color;
}
</style>
