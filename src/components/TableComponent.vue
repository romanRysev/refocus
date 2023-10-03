<template>
  <div>
    <slot name="append"></slot>
    <table class="table">
      <thead>
        <tr v-if="!props.headless">
          <th v-for="item in props.headers" :key="item.value">
            {{ item.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in props.items"
          :key="item.id"
          :class="{ table__row_background_gray: index % 2 !== 1 }"
          class="table__row"
        >
          <td
            v-for="(header, headerIndex) in props.headers"
            :key="headerIndex"
            :class="header.cellClass"
            class="table__cell"
          >
            <slot :name="`item-${header.value}`" :item="item">
              <span v-if="!$slots[`item-${header.value}`]">
                {{ item[header.value] }}</span
              >
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({ headers: Array, items: Array, headless: Boolean });
</script>
<style lang="scss">
@import "src/assets/variables.scss";
.table {
  border-spacing: 0;
  width: 100%;
  color: $table-text-color;
  &__row {
    height: 66px;

    &_background_gray {
      background-color: $table-row-background;
    }
  }

  &__cell {
    padding: 0;
  }
}
</style>
