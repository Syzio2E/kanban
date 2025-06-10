<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import Draggable from 'vuedraggable'
import ModalDialog from './components/ModalDialog.vue';
import { type Card, type List } from './types';
import HeaderNavbar from './components/HeaderNavbar.vue'
import LabelTag from './components/LabelTag.vue'

const handleAddTask = () => {
  openModal(0)
}

const handleInvite = () => {
  console.log('Invite clicked')
}

const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
      { id: 4, title: 'Task 4', description: 'Description for Task 4' }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: [{ id: 5, title: 'Task 5', description: 'Description for Task 5' }]
  }
])
const isModalOpen = ref(false)
const editingCard = ref<Card | null>(null)
const editingListIndex = ref<number | null>(null)
const modalMode = computed(() => editingCard.value === null ? 'add' : 'edit')

const openModal = (listIndex: number, card?: Card) => {
  editingListIndex.value = listIndex
  editingCard.value = card === undefined ? null : card
  isModalOpen.value = true
}

const saveCard = (card: Card) => {
  if (editingListIndex.value === null) return

  const currentList = lists[editingListIndex.value]

  if (modalMode.value === 'add') {
    // ✅ Assign a unique new ID
    const allIds = lists.flatMap(list => list.cards.map(c => c.id))
    const newId = allIds.length ? Math.max(...allIds) + 1 : 1
    currentList.cards.push({ ...card, id: newId })
  } else {
    // ✅ Editing existing card
    const cardIndex = currentList.cards.findIndex(c => c.id === card.id)
    if (cardIndex !== -1) {
      currentList.cards[cardIndex] = { ...card }
    }
  }

  closeModal()
}


const closeModal = () => {
  isModalOpen.value = false
  editingListIndex.value = null
  editingCard.value = null
}
</script>

<template>
  <div class="min-h-screen w-screen items-center justify-center bg-gray-50">
    <header
      class="w-full px-6 py-6 bg-white shadow flex items-center justify-between"
    ></header>
    <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-8 font-sans">
      <HeaderNavbar @add-task="handleAddTask" @invite="handleInvite" />
      <div class="flex flex-wrap gap-5 py-5 sm:flex-row">
        <div
          class="bg-gray-100 p-3 rounded-lg min-w-[350px] flex flex-col"
          v-for="(list, listIndex) in lists"
          :key="list.id"
        >
          <h2 class="font-medium mb-2">{{ list.title }}</h2>

          <Draggable :list="list.cards" group="cards" item-key="id">
            <template #item="{element}">
              <div
                @click="openModal(listIndex, element)"
                class="bg-white p-2 my-2 rounded shadow cursor-pointer"
              >
                <span class="text-sm font-medium">{{ element.title }}</span>
                <p class="text-xs text-gray-400">
                  {{ element.description }}
                </p>
                <div v-if="element.checkboxes?.length" class="mt-3" @click.stop>
                  <h4 class="text-[11px] font-semibold text-gray-500 mb-1">
                    Subtasks
                  </h4>
                  <ul class="space-y-1 text-xs text-gray-600">
                    <li
                      v-for="(item, idx) in element.checkboxes"
                      :key="idx"
                      class="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        v-model="element.checkboxes[idx].checked"
                        @click.stop
                        class="h-3 w-3 accent-green-500"
                      />
                      <span
                        :class="{ 'line-through text-gray-400': item.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- Links Section -->
<div v-if="element.links?.length" class="mt-2 space-y-1 text-blue-600 text-xs" @click.stop>
  <div v-for="(link, idx) in element.links" :key="'link-' + idx" class="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2v6m-6-6h6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2z" />
    </svg>
    <a
  :href="link.startsWith('http') ? link : 'https://' + link"
  target="_blank"
  rel="noopener noreferrer"
  class="hover:underline truncate"
>
  {{ link }}
</a>

  </div>
</div>
<!-- Images Section -->
<div v-if="element.images?.length" class="mt-2 flex flex-wrap gap-2" @click.stop>
  <img
    v-for="(img, idx) in element.images"
    :key="'img-' + idx"
    :src="img"
    alt="Uploaded"
    class="w-16 h-16 object-cover rounded border"
  />
</div>


                <div
                  v-if="element.tags?.length"
                  class="flex flex-wrap gap-1 mt-2"
                >
                  <LabelTag
                    v-for="(tag, idx) in element.tags"
                    :key="idx"
                    :label="tag"
                  />
                </div>

                <!-- Show checklist if any -->
              </div>
            </template>
          </Draggable>

          <button
            class="w-full bg-transparent rounded hover:bg-white text-gray-500 p-2 text-left mt-2 text-sm font-medium"
            @click="openModal(listIndex)"
          >
            + Add Card
          </button>
        </div>
      </div>

      <ModalDialog
        :is-open="isModalOpen"
        :card="editingCard"
        :mode="modalMode"
        @close="closeModal"
        @save="saveCard"
      />
    </main>
  </div>
</template>
