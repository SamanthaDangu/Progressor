<template>
  <div>
    <div class="modal-backgroung">
      <div class="modal">
        <h3>Modifier une tâche</h3>
        <form @submit.prevent="saveTask">
          <input
            type="text"
            v-model="taskToEdit.name"
            placeholder="Nom de la tâche"
          /><br />
          <textarea
            cols="30"
            rows="10"
            v-model="taskToEdit.description"
          ></textarea
          ><br />
          <select v-model="taskToEdit.temporality">
            <option
              v-for="tempo in temporalityTypes"
              :value="tempo.value"
              :key="tempo.id"
              :selected="tempo.value === taskToEdit.temporality"
            >
              {{ tempo.name }}
            </option></select
          ><br />
          <button :disabled="!isFormValid">Sauvegarder</button>
          <button @click="cancel">Annuler</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  props: {
    task: {
      required: true,
    },
  },
  setup(props, context) {
    let taskToEdit = ref({ ...props.task });

    const temporalityTypes = ref([
      {
        id: 1,
        name: "Court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "Moyen terme",
        value: "medium-term",
      },
      {
        id: 3,
        name: "Long terme",
        value: "long-term",
      },
    ]);
    let temporality = ref("");

    function saveTask() {
      const taskUpdated = {
        id: taskToEdit.value.id,
        name: taskToEdit.value.name,
        description: taskToEdit.value.description,
        temporality: taskToEdit.value.temporality,
      };
      context.emit("updatetask", taskUpdated);
    }

    function cancel() {
      context.emit("cancel");
    }

    const isFormValid = computed(() => {
      if (
        taskToEdit.value.name !== "" &&
        taskToEdit.value.description !== "" &&
        taskToEdit.value.temporality !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });

    return {
      temporalityTypes,
      temporality,
      taskToEdit,
      saveTask,
      cancel,
      isFormValid,
    };
  },
};
</script>
<style>
.modal-background {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: table;
  transition: opacity 0.3s ease;
}

.modal {
  border: 4px solid #42b983;
  background-color: white;
  padding-bottom: 22px;
  margin: 30px;
}
</style>
