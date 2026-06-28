<script setup lang="ts">
defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  modelValue: {
    type: [Number, String],
    default: null
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6 animate-fade-in">
    <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-6 flex gap-3">
      <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">
        {{ questionNumber }}
      </span>
      <span>{{ question.text }}</span>
    </h3>
    
    <div v-if="question.type === 'choice'" class="space-y-3">
      <label 
        v-for="(option, index) in question.options" 
        :key="index"
        class="flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 group hover:bg-slate-50"
        :class="[
          modelValue === index 
            ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' 
            : 'border-slate-200'
        ]"
        @click="$emit('update:modelValue', index)"
      >
        <div class="relative flex items-center justify-center w-5 h-5 mr-4 border-2 rounded-full transition-colors"
             :class="modelValue === index ? 'border-primary-600' : 'border-slate-300 group-hover:border-primary-400'">
          <div v-if="modelValue === index" class="w-2.5 h-2.5 bg-primary-600 rounded-full animate-fade-in"></div>
        </div>
        <span class="text-slate-700 font-medium select-none" :class="{ 'text-slate-900': modelValue === index }">
          {{ option }}
        </span>
      </label>
    </div>

    <div v-else-if="question.type === 'text'">
      <input 
        type="text"
        :value="modelValue === null ? '' : modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Javobingizni yozing..."
        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
      />
    </div>

    <div v-else-if="question.type === 'code'">
      <textarea 
        :value="modelValue === null ? '' : modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        placeholder="Kodni yozing..."
        rows="4"
        class="w-full px-4 py-3 bg-slate-900 text-green-400 font-mono text-sm rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors"
        spellcheck="false"
      ></textarea>
    </div>
  </div>
</template>
