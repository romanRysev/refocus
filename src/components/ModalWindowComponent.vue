<template>
  <div class="modal-window">
    <div ref="content" class="modal-window__container">
      <div class="modal-window__header">
        <button @click="$emit('close')" class="modal-window__close-button">
          <img
            src="../assets/close.svg"
            alt="close-icon"
            class="modal-window__close-icon"
          />
        </button>
      </div>
      <div class="modal-window__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, onMounted } from "vue";

const props = defineProps({
  width: String,
  height: String,
});

const content = ref("content");

onMounted(() => {
  content.value.style.width = props.width + "px";
  content.value.style.height = props.height + "px";
});
</script>
<style lang="scss">
.modal-window {
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__container {
    border-radius: 10px;
    background-color: white;
  }

  &__header {
    display: flex;
    justify-content: flex-end;
  }

  &__close-button {
    background-color: transparent;
    border: none;
    padding: 12px 12px 0 0;

    &:hover {
      cursor: pointer;
    }
  }

  &__close-icon {
    height: 24px;
    width: 24px;
  }

  &__content {
    margin-top: -57px;
    width: 100%;
    height: 100%;
    padding: 40px 20px 0;
    box-sizing: border-box;
  }
}
</style>
