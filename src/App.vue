<template>
  <Header @searchTasks="handleTaskSearched" />
  <div class="container">
    <AddTask @taskAdded="handleTaskAdded" />
    <TaskList :filteredTaskList="filteredTaskList" @taskDeleted="handleTaskDeleted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import AddTask from './components/AddTask.vue';
import TaskList from './components/TaskList.vue';

import { onMounted, ref, computed } from 'vue'
import { useToast } from 'vue-toastification';

onMounted(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    taskList.value = savedTasks;
  }
});

const taskList = ref([]);
const toast = useToast();
const searchedText = ref('');

const handleTaskAdded = (taskData) => {
  taskList.value.push({
    id: generateUniqueId(),
    taskName: taskData.taskName
  });
  saveTasksToLocalStorage();
  toast.success("Task Added Successfully.");
}

// Generate Unique Id
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
}

const handleTaskDeleted = (id) => {
  taskList.value = taskList.value.filter((tasks) =>
    tasks.id !== id
  );
  saveTasksToLocalStorage();
  toast.success("Task Deleted.");
}

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(taskList.value));
}

const handleTaskSearched = (searchVal) => {
  searchedText.value = searchVal
}

const filteredTaskList = computed(() => {
  return taskList.value.filter(tasks => {
    return tasks.taskName.toLowerCase().includes(searchedText.value.toLowerCase());
  });
});

</script>