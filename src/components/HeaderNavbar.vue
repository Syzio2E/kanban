<template>
  <header
    class="w-full pl-0 pr-4 sm:pr-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-y-1 sm:gap-y-0"
  >
    <!-- Left side -->
    <h1 class="text-lg sm:text-xl font-semibold text-gray-800">
      Your Tasks
    </h1>

    <!-- Right side buttons -->
    <div class="flex gap-1 sm:gap-3">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        @click="$emit('add-task')"
      >
        Add a Task
      </button>
      <button
        class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
       @click="openModal"
      >
        Invite
      </button>
    </div>
  </header>
    <InviteModal
    :is-open="isInviteModalOpen"
    @close="isInviteModalOpen = false"
    @invite="handleInvite"
  />
</template>

<script setup lang="ts">
defineEmits(['add-task', 'invite']);

import { ref } from 'vue'
import InviteModal from './InviteModal.vue'

const isInviteModalOpen = ref(false)

function openModal() {
  isInviteModalOpen.value = true
}

function handleInvite(email: string) {
  console.log('Inviting:', email)
  // You can send this email to an API
}
</script>
