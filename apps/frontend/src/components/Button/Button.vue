import { computed } from 'vue';
<script setup lang='ts'>
import { computed } from 'vue';


// INTERFACES
interface Props {
  type?: ButtonTypes
}

type ButtonTypes = 'default' | 'alt' | 'primary'

// PROPS, STORES, EMITS, ...
const props = withDefaults(defineProps<Props>(), {type: 'default'})

// REACTIVE VARS
const buttonStyles = computed(()=>  {
  switch (props.type) {
    case 'default':
      return 'bg-zinc-400 hover:bg-zinc-500';
    case 'alt':
      return 'bg-zinc-800 hover:bg-zinc-900 text-white';
    case 'primary':
      return 'bg-orange-500 hover:bg-orange-600 text-white';
  }
});

// VARS

// FUNCTIONS

// LIFECYCLE HOOKS, WATCHERS

</script>
<template>
  <button class="px-4 py-1.5 rounded" :class="buttonStyles" type="button">
    <slot />
  </button>
</template>
<style scoped>
</style>
<style>
</style>
