<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBerryStore } from "../store/store";
import { useI18n } from "vue-i18n";
import AlertMessage from "../components/AlertMessage.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const router = useRouter();
const berryStore = useBerryStore();
const { t } = useI18n();

const product = ref({
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
});

const showAlert = ref(false);
const alertMessage = ref("");

const submitForm = async () => {
  try {
    await berryStore.addProduct(product.value);
    showAlert.value = true;
    alertMessage.value = t("form.successAdd");

    // Reset form
    product.value = {
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    };

    // Redirect after a short delay
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const cancel = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-6">
      <AlertMessage v-if="showAlert" :message="alertMessage" type="success" />

      <h1 class="text-2xl font-bold mb-6">{{ t("form.addTitle") }}</h1>

      <div class="bg-white rounded-lg shadow p-6">
        <SkeletonLoader v-if="berryStore.loading" type="form" />

        <form v-else @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t("form.title")
            }}</label>
            <input
              v-model="product.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t("form.price")
            }}</label>
            <input
              v-model.number="product.price"
              type="number"
              step="0.01"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t("form.description")
            }}</label>
            <textarea
              v-model="product.description"
              required
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t("form.image")
            }}</label>
            <input
              v-model="product.image"
              type="url"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t("form.category")
            }}</label>
            <input
              v-model="product.category"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
            />
          </div>

          <div class="flex space-x-2 pt-4">
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {{ t("form.submit") }}
            </button>
            <button
              type="button"
              @click="cancel"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              {{ t("form.cancel") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
