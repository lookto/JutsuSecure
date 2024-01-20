<script setup lang="ts">
import { Jutsu } from '../../store/auth.store';
import bird from '@/assets/bird.webp';
import boar from '@/assets/boar.webp'
import dog from '@/assets/dog.webp'
import dragon from '@/assets/dragon.webp'
import hare from '@/assets/hare.webp'
import horse from '@/assets/horse.webp'
import monkey from '@/assets/monkey.webp'
import ox from '@/assets/ox.webp'
import ram from '@/assets/ram.webp'
import rat from '@/assets/rat.webp'
import snake from '@/assets/snake.webp';
import tiger from '@/assets/tiger.webp'

// INTERFACES
interface Props {
  jutsus: Array<Jutsu>;
}

// PROPS, STORES, EMITS, ...
defineProps<Props>();

// REACTIVE VARS

// VARS

// FUNCTIONS
const jutsuImage = (jutsu: Jutsu) => {
  switch (jutsu) {
    case 'bird':
      return bird; 
    case 'boar':
      return boar;
    case 'dog':
      return dog;
    case 'dragon':
      return dragon;
    case 'hare':
      return hare;
    case 'horse':
      return horse;
    case 'monkey':
      return monkey;
    case 'ox':
      return ox;
    case 'ram':
      return ram;
    case 'rat':
      return rat;
    case 'snake':
      return snake;
    case 'tiger':
      return tiger;
  }
}

const jutsuName = (jutsu: Jutsu) => {
  switch (jutsu) {
    case 'bird':
      return "Vogel"; 
    case 'boar':
      return 'Schwein';
    case 'dog':
      return 'Hund';
    case 'dragon':
      return 'Drache';
    case 'hare':
      return 'Hase';
    case 'horse':
      return 'Pferd';
    case 'monkey':
      return 'Affe';
    case 'ox':
      return 'Ochse';
    case 'ram':
      return 'Schaf';
    case 'rat':
      return 'Ratte';
    case 'snake':
      return 'Schlange';
    case 'tiger':
      return 'Tiger';
  }
}


// LIFECYCLE HOOKS, WATCHERS
</script>
<template>
  <div class="w-full flex justify-center gap-2">
    <div v-for="jutsu in jutsus" class="rounded overflow-hidden flex flex-col items-center w-20">
      <img :src="jutsuImage(jutsu)" />
      {{  jutsuName(jutsu) }}
    </div>
  </div>
</template>
<style scoped></style>
<style></style>
