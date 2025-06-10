<template>
  <header class="w-full pl-0 px-6 py-4 flex items-center justify-between">
    <!-- Left side -->
    <h1 class="text-xl font-semibold text-gray-800">Your Tasks</h1>

    <!-- Right side buttons -->
    <div class="flex gap-3">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        @click="$emit('add-task')"
      >
        Add a Task
      </button>
      <button
        class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
        @click="$emit('invite')"
      >
        Invite
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
// No script logic needed unless you want local state
defineEmits(['add-task', 'invite']);
</script>
