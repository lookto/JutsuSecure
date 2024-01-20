<script setup lang="ts">
import { ref, onBeforeMount, watchEffect } from 'vue';
import Button from '../Button/Button.vue';
import Webcam from '../Webcam/Webcam.vue';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import { sleep } from '@/common/sleep';

// INTERFACES

// PROPS, STORES, EMITS, ...
const modelLoaded = ref<boolean>(false);
const jutsuRecognizer = ref<GestureRecognizer>();
const videoRef = ref<HTMLVideoElement>();
const lastJutsuTime = ref<number>(-1);

// REACTIVE VARS

// VARS

// FUNCTIONS
const createJutsuRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
  );
  jutsuRecognizer.value = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
      delegate: 'GPU',
    },
    numHands: 2,
    runningMode: 'VIDEO',
  });
  modelLoaded.value = true;
};

const loadVideoElement = async () => {
  while (!videoRef.value) {
    await sleep(300);
    const videoElement = document.getElementById('webcam');
    if (videoElement) {
      videoRef.value = videoElement as HTMLVideoElement;
    }
  }
};

const predictJutsu = async() => {
  if(!videoRef.value || !jutsuRecognizer.value) return;

  // Now let's start detecting the stream.
  const nowInMs = Date.now();
  if (videoRef.value.currentTime !== lastJutsuTime.value) {
    lastJutsuTime.value = videoRef.value.currentTime;
    const results = jutsuRecognizer.value.recognizeForVideo(videoRef.value, nowInMs);
    console.log(results.landmarks)
  }

}

// LIFECYCLE HOOKS, WATCHERS
watchEffect(() => {
  if(videoRef.value && jutsuRecognizer.value) {
    videoRef.value.addEventListener('loadeddata', predictJutsu)
  }
});
onBeforeMount(() => {
  createJutsuRecognizer();
  loadVideoElement();
});
</script>
<template>
  <div class="flex flex-col items-center gap-6">
    <Webcam :loading="modelLoaded" />
    <div class="flex w-full flex-row justify-center gap-4">
      <Button type="alt">Zurücksetzen</Button>
      <Button type="primary">Login</Button>
    </div>
  </div>
</template>
<style scoped></style>
<style></style>
