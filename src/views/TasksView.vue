<template>
  <Modal
    v-if="isInEditMode"
    :task="taskToEdit"
    @updatetask="updateTask($event)"
    @cancel="cancelEdit"
  />
  <h3>Toutes les taches</h3>
  <input type="text" placeholder="Filtrer" v-model="letters" @keyup="filter" />
  <div class="radioFilters">
    <label for="all">
      <input type="radio" id="all" value="" v-model="selectedTemporality" />
      Toutes
    </label>
    <label for="short-term">
      <input
        type="radio"
        id="short-term"
        value="short-term"
        v-model="selectedTemporality"
      />
      Court
    </label>
    <label for="medium-term">
      <input
        type="radio"
        id="long-term"
        value="medium-term"
        v-model="selectedTemporality"
      />
      Moyen
    </label>
    <label for="long-term">
      <input
        type="radio"
        id="long-term"
        value="long-term"
        v-model="selectedTemporality"
      />
      Long
    </label>
  </div>
  <div v-if="tasksFiltered.length > 0">
    <div class="task" v-for="task in tasksFiltered" :key="task.id">
      <h3>{{ task.name }}</h3>
      <p>{{ task.description }}</p>
      <p>Echeance : {{ convertCase(task.temporality) }}</p>
      <div>
        <button class="small" @click="() => deleteTask(task.id)">
          Supprimer
        </button>
        <button class="small" @click="() => toggle(task)">Modif</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
import Modal from "../components/Modal.vue";

export default {
  components: {
    Modal,
  },
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    const selectedTemporality = ref("");
    tasks.value = tasksService.read();
    let tasksFiltered = ref([]);
    let isInEditMode = ref(false);
    let taskToEdit = ref([]);
    filter();

    function convertCase(temporality) {
      return tasksService.convertCase(temporality);
    }

    function filter() {
      if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }
    }

    function toggle(task) {
      console.log("toggle task", task)
      taskToEdit.value = task;
      isInEditMode.value = true;
    }

    function updateTask(task) {
      console.log("updateTask", task)
      tasksService.updateTask(task);
      tasks.value = tasksService.read();
      cancelEdit();
    }

    function cancelEdit() {
      isInEditMode.value = false;
      taskToEdit.value = null;
    }

    function deleteTask(id) {
      tasksService.deleteTask(id);
      tasks.value = tasksService.read();
      filter();
    }

    watch(selectedTemporality, (newValue, oldValue) => {
      console.log("newValue :", newValue, oldValue);
      if (newValue !== "") {
        filter();
      } else {
        tasksFiltered.value = tasks.value;
        filter();
      }
    });

    return {
      tasks,
      convertCase,
      letters,
      filter,
      tasksFiltered,
      selectedTemporality,
      deleteTask,
      taskToEdit,
      toggle,
      updateTask,
      cancelEdit,
      isInEditMode
    };
  },
};
</script>

<style scoped>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}

.radioFilters {
  display: flex;
  justify-content: center;
}

.small {
  width: 45px;
}
</style>
