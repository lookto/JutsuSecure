<script setup lang="ts">
import { RouterView } from 'vue-router';
import music from '@/assets/music.mp3'
import { onMounted } from 'vue';

// INTERFACES

// PROPS, STORES, EMITS, ...

// REACTIVE VARS

// VARS

// FUNCTIONS

// LIFECYCLE HOOKS, WATCHERS
onMounted(()=>{
  (document.getElementById('audio') as HTMLAudioElement).volume= 0.5
})
</script>
<template>
  <div class="min-h-[100svh]">
    <RouterView />
    <audio
      ref="audio"
      :src="music"
      autoplay
      loop
      id="audio"
     />
  </div>
</template>
<style>
#app {
  background: url(/naruto.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}</style>
