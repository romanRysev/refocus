<template>
  <section class="status-page">
    <div class="status-page__head">
      <ButtonComponent>
        <img src="../assets/back.svg" alt="back-icon" />
      </ButtonComponent>
      <div>
        <h1 class="status-page__head-title">Статусы участников</h1>
        <h2 class="status-page__head-subtitle">
          Стаусы дополнительно мотивируют участников на более активное участи в
          активностях.
        </h2>
      </div>
    </div>

    <TableComponent
      :headers="tableHeaders"
      :items="tableItems"
      class="status-page__table"
      headless
    >
      <template #append>
        <div class="status-page__table-append">
          <ButtonComponent
            v-if="!isShowAddingForm"
            @click="isShowAddingForm = true"
            color="secondary"
            class="status-page__add-form-open-button"
          >
            <img
              src="../assets/add.svg"
              alt="add-icon"
              class="icon status-page__add-form-open-button-icon"
            />Добавить статус
          </ButtonComponent>
          <form
            v-if="isShowAddingForm"
            action=""
            class="status-page__add-form"
            @submit.prevent=""
          >
            <table class="status-page__add-form-table">
              <tbody>
                <tr>
                  <td class="status-page__add-form-name-column">
                    <InputComponent
                      v-model="newLevel.name"
                      class="status-page__name-input"
                      id="start-input"
                      type="text"
                      placeholder="Статус"
                    />
                  </td>
                  <td class="short-text-column"><span>от</span></td>
                  <td class="input-column">
                    <InputComponent
                      v-model="newLevel.start"
                      class="status-page__input"
                      id="status-input"
                      type="number"
                      placeholder=""
                    />
                  </td>
                  <td class="short-text-column"><span>до</span></td>
                  <td class="input-column">
                    <InputComponent
                      v-model="newLevel.end"
                      class="status-page__input"
                      id="status-input"
                      type="number"
                      placeholder=""
                    />
                  </td>
                  <td class="text-column"><span>баллов</span></td>
                  <td class="icon-column">
                    <ButtonComponent
                      class="status-page__add-button"
                      color="primary"
                      @click.prevent="onAddButtonClick"
                    >
                      <img
                        src="../assets/add-white.svg"
                        alt="add-icon"
                        class="status-page__add-icon"
                      />
                      добавить
                    </ButtonComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div></template
      >

      <template #item-start="{ item }">
        <InputComponent
          :value="item.start"
          class="status-page__input"
          type="number"
          min="0"
          placeholder=""
          @input.stop="onInputChange($event.target.value, 'start', item)"
      /></template>

      <template #item-end="{ item }">
        <InputComponent
          :value="item.end"
          class="status-page__input"
          type="number"
          min="0"
          placeholder=""
          @input.stop="onInputChange($event.target.value, 'end', item)"
      /></template>

      <template #item-icon="{ item }">
        <ButtonComponent
          class="status-page__delete-button"
          @click="onDeleteButtonClick(item._id)"
        >
          <img
            src="../assets/delete.svg"
            alt="delete-icon"
            class="status-page__delete-icon"
          />
        </ButtonComponent>
      </template>
    </TableComponent>
    <ModalWindowComponent
      v-if="isShowDeletingModal"
      height="155"
      width="525"
      @close="onModalClose"
      ><p class="status-page__modal-title">
        Вы уверены, что хотите удалить статус?
      </p>
      <div class="status-page__modal-content">
        <ButtonComponent
          color="primary"
          class="status-page__modal-button"
          @click="onModalConfirm"
        >
          Да
        </ButtonComponent>
        <ButtonComponent
          class="status-page__modal-button status-page__modal-button_type_no"
          @click="onModalClose"
        >
          Нет
        </ButtonComponent>
      </div>
    </ModalWindowComponent>
  </section>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import TableComponent from "./TableComponent";
import ModalWindowComponent from "./ModalWindowComponent";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import {
  getLevels,
  createLevel,
  deleteLevel,
  updateLevel,
} from "@/services/levels";

const isShowAddingForm = ref(false);

const isShowDeletingModal = ref(false);

const levelIdForDeleting = ref(null);

const newLevel = ref({
  _id: "Must set random uuid or move id creation to backend. Use https://www.npmjs.com/package/uuid",
  name: "",
  start: 0,
  end: 0,
});

const levels = ref([]);

const tableItems = computed(() =>
  levels.value.map((level) => {
    return { ...level, from: "от", to: "до", scores: "баллов" };
  })
);

const tableHeaders = [
  { text: "Название", value: "name", cellClass: "name-column" },
  { text: "from", value: "from", cellClass: "short-text-column" },
  { text: "start", value: "start", inputLabel: "", cellClass: "input-column" },
  { text: "to", value: "to", cellClass: "short-text-column" },
  { text: "end", value: "end", inputLabel: "", cellClass: "input-column" },
  { text: "scores", value: "scores", cellClass: "text-column" },
  { text: "icon", value: "icon", cellClass: "icon-column" },
];

onBeforeMount(async () => {
  levels.value = (await getLevels()) ?? [];
});

const onAddButtonClick = () => {
  isShowAddingForm.value = false;
  onLevelCreate();
};

const onDeleteButtonClick = (_id) => {
  isShowDeletingModal.value = true;
  levelIdForDeleting.value = _id;
};

const onModalClose = () => {
  isShowDeletingModal.value = false;
  levelIdForDeleting.value = null;
};

const onModalConfirm = () => {
  isShowDeletingModal.value = false;
  onDelete();
};

const onDelete = async () => {
  await deleteLevel(levelIdForDeleting.value);
  levelIdForDeleting.value = null;
  levels.value = (await getLevels()) ?? [];
};

const onLevelCreate = async () => {
  await createLevel(newLevel.value);
  levels.value = (await getLevels()) ?? [];
};

const onInputChange = async (newValue, valueName, tableItem) => {
  const level = levels.value?.find((item) => item._id === tableItem._id);
  level[valueName] = newValue;
  await updateLevel(level);
};
</script>

<style lang="scss">
@import "src/assets/variables.scss";

.status-page {
  &__head {
    display: flex;
    align-items: start;
    text-align: left;
    margin-bottom: 30px;

    &-title {
      font-size: 20px;
      margin-bottom: 32px;
      margin-top: 15px;
    }

    &-subtitle {
      font-size: 16px;
      font-weight: 100;
      color: $text-primary;
    }
  }

  &__add-form-open-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
  }

  &__add-form-open-button-icon {
    height: 28px;
    width: 28px;
    object-fit: fill;
    margin-right: 10px;
  }

  &__delete-button {
    padding-left: 20px;
  }

  &__delete-icon {
    height: 24px;
    width: 24px;
    object-fit: fill;
  }

  &__add-form {
    display: flex;
    margin-top: -10px;
  }

  &__add-form-table {
    border-spacing: 0;
    width: 100%;

    td {
      padding: 0;
    }
  }

  &__add-form-name-column {
    font-weight: bold;
    width: 20%;
    text-align: left;
  }

  &__add-button {
    margin-right: -110px;
    width: 140px;
    height: 40px;
  }

  &__add-icon {
    height: 24px;
    width: 24px;
    margin-right: 12px;
    object-fit: fill;
  }

  &__table {
    margin-left: 60px;
    width: 60%;

    &-append {
      padding-bottom: 24px;
    }
  }

  &__input {
    width: 120px;
    text-align: center;
    font-weight: bold;
    background-color: transparent;
  }

  &__name-input {
    width: 100%;
    text-align: center;
    font-weight: bold;
    background-color: transparent;
  }

  &__modal-title {
    font-size: 20px;
    font-size: 15px;
    margin: 3px;
    font-weight: bold;
    color: $text-primary;
  }

  &__modal-content {
    display: flex;
    padding-top: 30px;
    justify-content: center;
  }

  &__modal-button {
    height: 36px;
    width: 120px;
    border-radius: 20px;
    &_type_no {
      margin-left: 30px;
      border: 1px solid $orange;
      color: $text-primary;
    }
  }

  .name-column {
    font-weight: bold;
    width: 20%;
    text-align: left;
    padding-left: 20px;
  }

  .short-text-column {
    width: 10%;
  }

  .text-column {
    width: 14%;
    padding-right: 30px;
  }

  .input-column {
    width: 19%;
  }

  .icon-column {
    width: 8%;
    background-color: #fff;
  }
}
</style>
