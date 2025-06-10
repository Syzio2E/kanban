<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { Card } from "@/types";

const props = defineProps<{
  isOpen: boolean;
  card: Card | null;
  mode: "add" | "edit";
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", card: Card): void;
}>();
const titleInput = ref<HTMLInputElement | null>(null);
const modalElement = ref<HTMLDivElement | null>(null);
// const localCard = ref<Card>({
//   id: 0, title: '', description: ''
// })
const localCard = ref<Card>({
  id: 0,
  title: "",
  description: "",
  tags: [],
  checkboxes: [],
  links: [],
  images: [],
});

const { activate, deactivate } = useFocusTrap(modalElement);

const newTag = ref("");
const addTag = () => {
  const tag = newTag.value.trim();
  if (tag && !localCard.value.tags?.includes(tag)) {
    localCard.value.tags?.push(tag);
  }
  newTag.value = "";
};

const removeTag = (index: number) => {
  localCard.value.tags?.splice(index, 1);
};

const addCheckbox = () => {
  localCard.value.checkboxes?.push({ label: "", checked: false });
};
const removeCheckbox = (index: number) => {
  localCard.value.checkboxes?.splice(index, 1);
};

const newLink = ref("");
const addLink = () => {
  const link = newLink.value.trim();
  if (link && !localCard.value.links?.includes(link)) {
    localCard.value.links?.push(link);
  }
  newLink.value = "";
};

const removeLink = (index: number) => {
  localCard.value.links?.splice(index, 1);
};

const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        localCard.value.images?.push(reader.result);
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index: number) => {
  localCard.value.images?.splice(index, 1);
};

watch(
  [() => props.isOpen, () => props.mode, () => props.card],
  ([isOpen, mode, card]) => {
    if (isOpen) {
     if (mode === 'add' || card === null) {
  localCard.value = {
    id: 0,
    title: '',
    description: '',
    tags: [],
    checkboxes: [],
    links: [],      
    images: []     
  }
} else {
  // Deep clone and patch missing fields
  const cloned = JSON.parse(JSON.stringify(card))
  localCard.value = {
    ...cloned,
    tags: cloned.tags ?? [],
    checkboxes: cloned.checkboxes ?? [],
    links: cloned.links ?? [],        
    images: cloned.images ?? []    
  }
}

    }
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      activate();
      titleInput.value?.focus();
    } else {
      deactivate();
    }
  }
);
</script>

<template>
  <div
    v-if="isOpen"
    @keydown.esc="emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    ref="modalElement"
    @click.self="emit('close')"
  >
    <div class="bg-white p-5 rounded max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === "add" ? "Add New Card" : "Edit Card" }}
      </h2>
      <input
        v-model="localCard.title"
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded"
        ref="titleInput"
      />

      <textarea
        v-model="localCard.description"
        class="w-full p-2 mb-4 border rounded"
        placeholder="Description"
        aria-label="Card Description"
      ></textarea>

      <div class="mb-4">
        <label class="block font-semibold mb-1">Tags</label>
        <div class="flex items-center mb-2">
          <input
            v-model="newTag"
            type="text"
            placeholder="Enter tag"
            class="flex-1 border p-2 rounded mr-2"
          />
          <button
            @click="addTag"
            class="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tag, index) in localCard.tags"
            :key="index"
            class="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
          >
            {{ tag }}
            <button
              @click="removeTag(index)"
              class="ml-1 text-red-500 font-bold"
            >
              &times;
            </button>
          </span>
        </div>
      </div>
       <!-- Links Section -->
      <!-- Links Section -->
      <div class="mb-4">
        <label class="block font-semibold mb-1">Links</label>
        <div class="flex items-center mb-2">
          <input
            v-model="newLink"
            type="url"
            placeholder="Enter a URL"
            class="flex-1 border p-2 rounded mr-2"
          />
          <button
            @click="addLink"
            class="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>

        <!-- Display list of added links -->
        <ul class="space-y-1 text-sm">
          <li
            v-for="(link, index) in localCard.links"
            :key="index"
            class="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
          >
            <a
              :href="link"
              target="_blank"
              rel="noopener"
              class="text-blue-600 underline break-all"
            >
              {{ link }}
            </a>
            <button
              @click="removeLink(index)"
              class="ml-2 text-red-500 font-bold"
            >
              &times;
            </button>
          </li>
        </ul>
      </div>

      <!-- Checkboxes Section -->
      <div class="mb-4">
        <label class="block font-semibold mb-1">Subtask</label>
        <div
          v-for="(item, index) in localCard.checkboxes"
          :key="index"
          class="flex items-center mb-2"
        >
          <input
            v-model="item.checked"
            type="checkbox"
            class="mr-2 accent-green-500"
          />
          <input
            v-model="item.label"
            type="text"
            placeholder="Label"
            class="flex-1 border p-1 rounded mr-2"
          />
          <button @click="removeCheckbox(index)" class="text-red-500 font-bold">
            &times;
          </button>
        </div>
        <button
          @click="addCheckbox"
          class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
        >
          Add Subtask
        </button>
      </div>

     

      <!-- Image Upload Section -->
      <!-- Image Upload Section -->
      <div class="mb-4">
        <label class="block font-semibold mb-1">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleImageUpload"
          class="block mb-2"
        />

        <!-- Image previews -->
        <div class="flex gap-2 flex-wrap">
          <div
            v-for="(img, index) in localCard.images"
            :key="index"
            class="relative w-24 h-24 border rounded overflow-hidden"
          >
            <img
              :src="img"
              alt="Uploaded Image"
              class="object-cover w-full h-full"
            />
            <button
              @click="removeImage(index)"
              class="absolute top-0 right-0 text-white bg-black bg-opacity-60 px-1 text-xs rounded-bl"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <button
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          @click="emit('save', localCard)"
        >
          {{ mode === "add" ? "Add" : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>
