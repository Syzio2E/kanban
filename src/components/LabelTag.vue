<template>
  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium leading-relaxed', colorClass]">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
}>()

const tagColorPairs = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-red-100 text-red-800',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-indigo-100 text-indigo-800',
  'bg-teal-100 text-teal-800',
  'bg-orange-100 text-orange-800',
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

const colorClass = computed(() => {
  const index = hashString(props.label) % tagColorPairs.length
  return tagColorPairs[index]
})
</script>

