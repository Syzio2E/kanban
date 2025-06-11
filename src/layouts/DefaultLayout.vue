<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-full px-6 py-6 bg-white shadow flex items-center justify-between z-2">
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
       <div
      class="w-full px-6 py-6 bg-white shadow flex items-center justify-between"
    ></div>

      <!-- Page Content -->
      <main class="p-4 overflow-auto flex-1 bg-gray-50">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed here for layout
</script>
