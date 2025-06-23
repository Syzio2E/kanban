<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-60 bg-white-100 shadow flex flex-col items-center py-10">
      <nav class="flex flex-col gap-8 px-4">
        <Icon icon="mdi:home-outline" class="w-8 h-8 text-gray-400 hover:text-blue-500 transition" />
        <Icon icon="mdi:folder-outline" class="w-8 h-8 text-gray-400 hover:text-blue-500 transition" />
        <Icon icon="mdi:file-document-outline" class="w-8 h-8 text-gray-400 hover:text-blue-500 transition" />
        <Icon icon="mdi:bell-outline" class="w-8 h-8 text-gray-400 hover:text-blue-500 transition" />
        <Icon icon="mdi:cog-outline" class="w-8 h-8 text-gray-400 hover:text-blue-500 transition" />
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="w-full px-6 py-6 bg-white shadow flex items-center justify-between">
        <!-- Header content -->
      </header>

      <!-- Page Content -->
      <main class="p-4 overflow-auto flex-1 bg-gray-50">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
