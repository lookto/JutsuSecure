<script setup lang='ts'>
import Card from '@/components/Card/Card.vue';
import Container from '@/components/Container/Container.vue';
import { useAuthStore } from '../store/auth.store';

// INTERFACES

// PROPS, STORES, EMITS, ...
const authStore = useAuthStore();

// REACTIVE VARS

// VARS

// FUNCTIONS

// LIFECYCLE HOOKS, WATCHERS

</script>
<template>
  <div>
  <div class="relative min-h-[100svh] flex flex-col justify-center">
    <Container class="z-20">
      <Card> 
        <div class="flex flex-col items-center py-20">
          <p class="text-xl">
            Sei gegrüßt 

            <b>
              {{ authStore.user?.name }}

            </b>
          </p>


        </div>
      </Card>
    </Container>
  </div>
  </div>
</template>
<style scoped>
</style>
<style>
</style>
