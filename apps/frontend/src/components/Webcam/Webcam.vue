<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { mdiLoading } from '@mdi/js';
import Icon from '../Icon/Icon.vue';

// INTERFACES
interface Props {
  loadingOverwrite?: boolean;
}

// PROPS, STORES, EMITS, ...
defineProps<Props>();
const isLoading = ref<boolean>(true);
const cameraRef = ref<HTMLVideoElement>();

// REACTIVE VARS

// VARS

// FUNCTIONS
const setupCamera = async() => {
			const stream = await navigator.mediaDevices
				.getUserMedia({audio: false, video: true})

        if (stream) {
          isLoading.value= false;
          if(cameraRef.value) {
            cameraRef.value.srcObject = stream;
          }
        }
};


// LIFECYCLE HOOKS, WATCHERS
onMounted(() => {
  setupCamera();
});
</script>
<template>
  <div
    class="flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded bg-zinc-300"
  >
    <div v-if="loadingOverwrite || isLoading" class="flex flex-col items-center gap-8">
      <Icon
        :path="mdiLoading"
        type="mdi"
        class="h-16 w-16 animate-spin !text-zinc-700"
      />
      <p class="text-zinc-500">Loading</p>
    </div>
    <video v-show="!(loadingOverwrite || isLoading)" id="webcam" ref="cameraRef" class="w-full" autoplay></video>
  </div>
</template>
<style scoped></style>
<style></style>
