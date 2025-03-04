<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}>();

const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
  }, props.duration || 3000);
});

const bgColor = () => {
  switch (props.type) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    case "info":
      return "bg-blue-500";
    default:
      return "bg-green-500";
  }
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-4 right-4 p-4 rounded-md text-white shadow-lg"
      :class="bgColor()"
    >
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
