<script setup lang="ts">
defineProps<{
  type: "table" | "detail" | "form";
  rows?: number;
}>();
</script>

<template>
  <div class="animate-pulse">
    <!-- Table Skeleton -->
    <div v-if="type === 'table'" class="space-y-4">
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div
        v-for="i in rows || 5"
        :key="i"
        class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"
      ></div>
    </div>

    <!-- Detail Skeleton -->
    <div v-else-if="type === 'detail'" class="space-y-4">
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div class="space-y-2">
        <div
          v-for="i in 6"
          :key="i"
          class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"
        ></div>
      </div>
    </div>

    <!-- Form Skeleton -->
    <div v-else-if="type === 'form'" class="space-y-6">
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      <div v-for="i in 5" :key="i" class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
</template>
