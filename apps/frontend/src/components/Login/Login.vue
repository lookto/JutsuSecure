<script setup lang="ts">
import { ref, onBeforeMount, watchEffect, toRaw } from 'vue';
import Button from '../Button/Button.vue';
import Webcam from '../Webcam/Webcam.vue';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import { sleep } from '@/common/sleep';
// @ts-ignore
import task from '@/assets/gesture_recognizer.task';
import { Jutsu, useAuthStore } from '../../store/auth.store';
import JutsuViewer from '../JutsuViewer/JutsuViewer.vue';

// INTERFACES

// PROPS, STORES, EMITS, ...
const authStore = useAuthStore();

// REACTIVE VARS
const modelLoaded = ref<boolean>(false);
const jutsuRecognizer = ref<GestureRecognizer>();
const videoRef = ref<HTMLVideoElement>();
const lastJutsuTime = ref<number>(-1);
const currentJutsu = ref<string | undefined>();
const jutsuDebounce = ref<number>(0);
const email = ref<string>();

// VARS
const jutsuArray: Array<Jutsu> = [
  'monkey',
  'dragon',
  'rat',
  'bird',
  'snake',
  'ox',
  'dog',
  'horse',
  'tiger',
  'boar',
  'ram',
  'hare',
];

// FUNCTIONS
const createJutsuRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
  );
  jutsuRecognizer.value = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: task,
      // 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
      delegate: 'GPU',
    },
    numHands: 2,
    minHandDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
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

const predictJutsu = async () => {
  if (!videoRef.value || !jutsuRecognizer.value) return;

  // Now let's start detecting the stream.
  const nowInMs = Date.now();
  if (videoRef.value.currentTime !== lastJutsuTime.value) {
    lastJutsuTime.value = videoRef.value.currentTime;
    const results = toRaw(jutsuRecognizer.value).recognizeForVideo(
      videoRef.value,
      nowInMs
    );
    if (results.gestures[0]?.[0]) {
      const newJutsu = results.gestures[0][0];
      if (newJutsu.score > 0.8) {
        if (
          jutsuArray.includes(
            newJutsu.categoryName.toLocaleLowerCase() as Jutsu
          ) &&
          (currentJutsu.value === newJutsu.categoryName || !currentJutsu.value)
        ) {
          if (jutsuDebounce.value < 10) {
            jutsuDebounce.value++;
          } else {
            authStore.addJutsuToLogin(newJutsu.categoryName as Jutsu);
          }
          currentJutsu.value = newJutsu.categoryName;
        } else {
          currentJutsu.value = undefined;
          jutsuDebounce.value = 0;
        }
      }
    }
  }

  window.requestAnimationFrame(predictJutsu);
};

// LIFECYCLE HOOKS, WATCHERS
watchEffect(() => {
  if (videoRef.value && jutsuRecognizer.value) {
    videoRef.value.addEventListener('loadeddata', predictJutsu);
  }
});

onBeforeMount(() => {
  createJutsuRecognizer();
  loadVideoElement();
});
</script>
<template>
  <div class="flex flex-col items-center gap-6">
    <label class="flex gap-3 items-center">
      Email
      <input v-model="email" type="email" class="px-3 py-1.5 rounded border border-orange-500">
    </label>
    <Webcam :loading="modelLoaded" />
    <JutsuViewer :jutsus="authStore.loginJutsu" />
    <div class="flex w-full flex-col justify-center gap-4">
      <Button @click="authStore.loginJutsu= []" type="alt">Zurücksetzen</Button>
      <Button @click="authStore.login(email || '')" type="primary">Login</Button>
    </div>
  </div>
</template>
<style scoped></style>
<style></style>
