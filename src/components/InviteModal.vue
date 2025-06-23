<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Invite by Email</h2>
      
      <input
        v-model="email"
        type="email"
        placeholder="Enter email address"
        class="w-full border border-gray-300 p-2 rounded mb-4"
      />

      <div class="flex justify-end gap-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="sendInvite"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Invite
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'invite', email: string): void
}>()

const email = ref('')

function sendInvite() {
  if (!email.value.trim()) return
  emit('invite', email.value.trim())
  email.value = ''
  emit('close')
}
</script>
