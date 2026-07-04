<template>
  <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary-600 flex items-center gap-2">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Testoluvchi
          </NuxtLink>
        </div>
        <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <NuxtLink to="/" class="text-slate-500 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors" activeClass="text-primary-600 font-semibold">Bosh sahifa</NuxtLink>
          <NuxtLink to="/tests" class="text-slate-500 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors" activeClass="text-primary-600 font-semibold">Barcha testlar</NuxtLink>
          <NuxtLink to="/natijalar" class="text-slate-500 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors" activeClass="text-primary-600 font-semibold">Natijalar</NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
