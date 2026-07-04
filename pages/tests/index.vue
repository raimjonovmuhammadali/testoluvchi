<script setup lang="ts">
import testsData from '~/data/tests.json'

const tests = ref(testsData)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12 animate-fade-in">
      <h1 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Mavjud Testlar</h1>
      <p class="mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4">
        Yo'nalishni tanlang va bilimingizni sinang. Omad!
      </p>
    </div>
    
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <TestCard v-for="test in tests" :key="test.id" :test="test" />
    </div>
  </div>
</template>
