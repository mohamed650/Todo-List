<template>
    <div class="headerContainer">
        <h3>To Do</h3>
        <div class="searchContainer">
            <input type="search" v-model="searchVal" placeholder="Search..." />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const searchVal = ref('');
const emit = defineEmits(['searchTasks']);
watch(searchVal, (newValue) => {
    emit('searchTasks', newValue);
});
</script>

<style scoped>
.headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: #fff;
    background-color: #2281ff;
}

h3 {
    margin: 0;
}

.searchContainer {
    display: flex;
    align-items: center;
    flex: 1;
}

input[type="search"] {
    margin: 0 auto;
    padding: 5px 10px 5px 25px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: url('../assets/searchIcon.svg') no-repeat left center #fff;
    background-size: 20px;
    width: 250px;
}

input[type="search"]:focus {
    outline: none;
    /* Change border color on focus */
}
</style>