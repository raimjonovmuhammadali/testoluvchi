<script setup lang="ts">
defineProps({
  test: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
    <div class="flex items-center justify-between mb-4">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
        {{ test.category }}
      </span>
      <span class="text-sm text-slate-500 flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {{ test.duration }} mins
      </span>
    </div>
    <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{{ test.title }}</h3>
    <p class="text-slate-600 text-sm flex-grow mb-6">{{ test.description }}</p>
    <div class="mt-auto flex items-center justify-between">
      <span class="text-sm font-medium text-slate-500">{{ test.questions ? test.questions.length : (test.variants ? test.variants['1'].length : 0) }} Questions</span>
      <NuxtLink :to="`/tests/${test.id}`" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm">
        Start Test
      </NuxtLink>
    </div>
  </div>
</template>
