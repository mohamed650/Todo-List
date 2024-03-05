<template>
    <ul id="list" class="list">
        <li v-for="tasks in filteredTaskList" :key="tasks.id">
            <label>
                <input type="checkbox" v-model="tasks.checked">
                <span>{{ tasks.taskName }}</span>
            </label>
            <DeleteIcon :style="delIcon" @click="deleteTask(tasks.id, tasks.checked)" />
        </li>
    </ul>
</template>

<script setup>
import DeleteIcon from './Icons/DeleteIcon.vue';
import { defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
    filteredTaskList: {
        type: Array,
        required: true
    }
})

const delIcon = {
    width: 20 + "px",
    cursor: "pointer"
}

const emit = defineEmits(['taskDeleted']);
const toast = useToast();
const deleteTask = (id, isChecked) => {
    if (isChecked) {
        emit('taskDeleted', id);
    } else {
        toast.error("Please select the checkbox!!!");
    }
}
</script>

<style scoped>
input[type="checkbox"] {
    margin-right: 5px;
}
</style>