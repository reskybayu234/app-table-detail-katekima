<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBerryStore } from "../store/store";
import { useI18n } from "vue-i18n";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const route = useRoute();
const router = useRouter();
const berryStore = useBerryStore();
const { t } = useI18n();

const selectedBerryId = ref<number>(parseInt(route.params.id as string));

onMounted(async () => {
  await berryStore.fetchBerries();
  fetchBerryDetail();
});

const fetchBerryDetail = async () => {
  await berryStore.fetchBerryDetail(selectedBerryId.value);
};

const handleViewDetail = () => {
  router.push(`/detail/${selectedBerryId.value}`);
  fetchBerryDetail();
};

const berryOptions = computed(() => {
  return berryStore.berries.map((berry) => ({
    id: berry.id,
    name: berry.name,
  }));
});
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-4">{{ t("detail.title") }}</h1>

        <div class="flex items-center space-x-2 mb-6">
          <select v-model="selectedBerryId" class="border rounded p-2">
            <option
              v-for="berry in berryOptions"
              :key="berry.id"
              :value="berry.id"
            >
              {{ berry.name }}
            </option>
          </select>

          <button
            @click="handleViewDetail"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {{ t("detail.view") }}
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <SkeletonLoader v-if="berryStore.loading" type="detail" />

        <div v-else-if="berryStore.selectedBerry">
          <h2 class="text-xl font-semibold mb-4 capitalize">
            {{ berryStore.selectedBerry.name }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.growth") }}
              </div>
              <div>{{ berryStore.selectedBerry.growth_time }}</div>
            </div>

            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.harvest") }}
              </div>
              <div>{{ berryStore.selectedBerry.max_harvest }}</div>
            </div>

            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.power") }}
              </div>
              <div>{{ berryStore.selectedBerry.natural_gift_power }}</div>
            </div>

            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.size") }}
              </div>
              <div>{{ berryStore.selectedBerry.size }}</div>
            </div>

            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.smoothness") }}
              </div>
              <div>{{ berryStore.selectedBerry.smoothness }}</div>
            </div>

            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.dryness") }}
              </div>
              <div>{{ berryStore.selectedBerry.soil_dryness }}</div>
            </div>

            <div class="border rounded p-3">
              <div class="font-medium text-gray-700">
                {{ t("detail.firmness") }}
              </div>
              <div class="capitalize">
                {{ berryStore.selectedBerry.firmness.name }}
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium mb-2">{{ t("detail.flavors") }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div
                v-for="flavor in berryStore.selectedBerry.flavors"
                :key="flavor.flavor.name"
                class="border rounded p-2"
              >
                <div class="capitalize">{{ flavor.flavor.name }}</div>
                <div class="text-sm text-gray-600">
                  Potency: {{ flavor.potency }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          {{ t("detail.select") }}
        </div>
      </div>
    </div>
  </div>
</template>
