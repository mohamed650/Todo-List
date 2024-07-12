<template>
    <form id="form" @submit.prevent="addTask">
        <div class="taskContainer">
            <input type="text" v-model="taskName">
            <div class="addIcon">
                <button>+</button>
                <button>-</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const taskName = ref('');
const toast = useToast();
const emit = defineEmits(['taskAdded']);
const addTask = () => {
    if (!taskName.value) {
        toast.error("Task cannot be empty!!!");
        return;
    } else if (taskName.value.trim() === '') {
        toast.error("Whitespaces are not allowed!!!");
        return;
    } else {
        const taskData = {
            taskName: taskName.value
        }

        emit('taskAdded', taskData);
        taskName.value = '';    
    }
}
</script>

<style scoped>
.taskContainer {
    display: flex;
    align-items: center;
    justify-content: right;
}

input[type="text"] {
    width: 325px;
    height: 35px;
    border: none;
    outline: none;
    box-shadow: var(--box-shadow);
}

.taskContainer .addIcon {
    width: 35px;
    height: 35px;
    background: #2281ff;
    color: #fff;
    box-shadow: var(--box-shadow);
}

.addIcon button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    font-size: 22px;
    cursor: pointer;
    border: none;
    background: none;
    color: #fff;
    width: 100%;
}
</style>