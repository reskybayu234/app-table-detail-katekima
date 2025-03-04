<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useBerryStore } from "../store/store";
import { useI18n } from "vue-i18n";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const router = useRouter();
const berryStore = useBerryStore();
const { t } = useI18n();

const searchTimeout = ref<number | null>(null);

// Pagination options
const perPageOptions = [10, 30, 50];

onMounted(() => {
  berryStore.fetchBerries();
});

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;

  // Clear previous timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  // Set new timeout for search to avoid too many updates
  searchTimeout.value = setTimeout(() => {
    berryStore.setSearchQuery(target.value);
  }, 300) as unknown as number;
};

const goToEdit = (id: number) => {
  router.push(`/edit/${id}`);
};

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`);
};

const handleDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this item?")) {
    try {
      await berryStore.deleteProduct(id);
      alert("Item deleted successfully");
      berryStore.fetchBerries();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
};

const goToAdd = () => {
  router.push("/add");
};

// Pagination controls
const goToPage = (page: number) => {
  if (page >= 1 && page <= berryStore.totalPages) {
    berryStore.setPage(page);
  }
};

const changeItemsPerPage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  berryStore.setItemsPerPage(parseInt(target.value));
};

// Pagination display
const paginationRange = computed(() => {
  const range = [];
  const totalPages = berryStore.totalPages;
  const currentPage = berryStore.currentPage;

  // Always show first page
  range.push(1);

  // Calculate range around current page
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  // Add ellipsis if needed
  if (start > 2) {
    range.push("...");
  }

  // Add pages in range
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // Add ellipsis if needed
  if (end < totalPages - 1) {
    range.push("...");
  }

  // Add last page if not already included
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
});
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">{{ t("nav.home") }}</h1>
        <button
          @click="goToAdd"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {{ t("table.add") }}
        </button>
      </div>

      <div class="mb-4">
        <input
          type="text"
          :placeholder="t('table.search')"
          class="w-full p-2 border rounded"
          :value="berryStore.searchQuery"
          @input="handleSearch"
        />
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <SkeletonLoader
          v-if="berryStore.loading"
          type="table"
          :rows="berryStore.itemsPerPage"
        />

        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("table.no") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("table.name") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("table.actions") }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(berry, index) in berryStore.paginatedBerries"
              :key="berry.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                {{
                  (berryStore.currentPage - 1) * berryStore.itemsPerPage +
                  index +
                  1
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <a
                  @click="goToDetail(berry.id)"
                  class="text-blue-600 hover:underline cursor-pointer"
                >
                  {{ berry.name }}
                </a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button
                    @click="goToEdit(berry.id)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    {{ t("table.edit") }}
                  </button>
                  <button
                    @click="handleDelete(berry.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    {{ t("table.delete") }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center">
          <span class="mr-2">{{ t("table.itemsPerPage") }}:</span>
          <select
            v-model="berryStore.itemsPerPage"
            @change="changeItemsPerPage"
            class="border rounded p-1"
          >
            <option
              v-for="option in perPageOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div class="flex items-center space-x-1">
          <button
            @click="goToPage(berryStore.currentPage - 1)"
            :disabled="berryStore.currentPage === 1"
            class="px-3 py-1 rounded border"
            :class="
              berryStore.currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            "
          >
            &lt;
          </button>

          <button
            v-for="page in paginationRange"
            :key="page"
            @click="typeof page === 'number' ? goToPage(page) : null"
            class="px-3 py-1 rounded border"
            :class="
              page === berryStore.currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'cursor-default'
                : 'hover:bg-gray-100'
            "
          >
            {{ page }}
          </button>

          <button
            @click="goToPage(berryStore.currentPage + 1)"
            :disabled="berryStore.currentPage === berryStore.totalPages"
            class="px-3 py-1 rounded border"
            :class="
              berryStore.currentPage === berryStore.totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            "
          >
            &gt;
          </button>
        </div>

        <div>
          {{ t("table.page") }} {{ berryStore.currentPage }}
          {{ t("table.of") }} {{ berryStore.totalPages }}
        </div>
      </div>
    </div>
  </div>
</template>
