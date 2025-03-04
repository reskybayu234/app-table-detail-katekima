<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t, locale } = useI18n();

const languages = [
  { code: "en", name: "English" },
  { code: "id", name: "Indonesia" },
];

const changeLanguage = (lang: string) => {
  locale.value = lang;
};
</script>

<template>
  <div class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <div class="text-2xl font-bold mb-8">Berry App</div>

    <nav class="space-y-2">
      <router-link to="/" class="block py-2 px-4 rounded hover:bg-gray-700">
        {{ t("nav.home") }}
      </router-link>
      <router-link to="/add" class="block py-2 px-4 rounded hover:bg-gray-700">
        {{ t("nav.add") }}
      </router-link>
    </nav>

    <div class="mt-8">
      <div class="text-sm text-gray-400 mb-2">Language</div>
      <div class="flex space-x-2">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="px-3 py-1 text-sm rounded"
          :class="
            locale === lang.code
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
          "
        >
          {{ lang.name }}
        </button>
      </div>
    </div>
  </div>
</template>
