<script lang="ts" setup>
import {ref} from 'vue'
import TaskCard from '@/components/TaskCard.vue'
const items = ref([
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item 3'}
])
</script>

<template>
  <div>
    <h1>Item List</h1>
    <TaskCard :items="items">
      <template #item="{item}">
        <strong class="text-5xl">{{ item.name }}</strong>
      </template>
    </TaskCard>
  </div>
</template>