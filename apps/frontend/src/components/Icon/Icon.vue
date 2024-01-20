<script setup lang="ts">
import { PropType, computed } from 'vue';

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<keyof typeof types>,
    default: 'default',
  },
  size: {
    type: Number,
    default: undefined,
  },
  viewbox: {
    type: String,
    default: undefined,
  },
});

const types: Record<string, { size: number; viewbox: string }> = {
  mdi: {
    size: 24,
    viewbox: '0 0 24 24',
  },
  'simple-icons': {
    size: 24,
    viewbox: '0 0 24 24',
  },
  default: {
    size: 0,
    viewbox: '0 0 0 0',
  },
};

const defaultValues = computed(() => {
  return types[props.type] || types.default;
});

const iconSize = computed(() => {
  return props.size || defaultValues.value.size;
});

const iconViewBox = computed(() => {
  return props.viewbox || defaultValues.value.viewbox;
});
</script>
<template>
  <svg
    class="text-zinc-600 dark:text-zinc-300"
    fill="currentColor"
    :width="iconSize"
    :height="iconSize"
    :viewBox="iconViewBox"
  >
    <path :d="path" />
  </svg>
</template>