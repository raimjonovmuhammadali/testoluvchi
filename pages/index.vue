<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-slate-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left animate-slide-up">
              <h1 class="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Master your skills with</span>
                <span class="block text-primary-600 xl:inline">Premium Testing</span>
              </h1>
              <p class="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Evaluate your knowledge across various subjects including Mathematics, Programming, and Trivia. Get instant results and detailed analytics.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <NuxtLink to="/tests" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-colors">
                    Get Started
                  </NuxtLink>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <NuxtLink to="/tests" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg transition-colors">
                    View Tests
                  </NuxtLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-primary-50 overflow-hidden flex items-center justify-center">
        <!-- Abstract Illustration or Shape -->
        <div class="relative w-full h-full flex items-center justify-center p-12">
            <div class="absolute w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
            <div class="absolute w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow" style="animation-delay: 1s; transform: translate(50px, 50px)"></div>
            <div class="relative z-10 bg-white p-8 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100 max-w-sm w-full">
               <div class="w-full h-4 bg-slate-100 rounded mb-4"></div>
               <div class="w-3/4 h-4 bg-slate-100 rounded mb-8"></div>
               <div class="space-y-3">
                 <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full border-2 border-primary-500 flex items-center justify-center"><div class="w-2.5 h-2.5 bg-primary-500 rounded-full"></div></div>
                    <div class="w-full h-10 bg-primary-50 rounded-lg"></div>
                 </div>
                 <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                    <div class="w-full h-10 border border-slate-200 rounded-lg"></div>
                 </div>
                 <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                    <div class="w-full h-10 border border-slate-200 rounded-lg"></div>
                 </div>
               </div>
               <div class="mt-8 flex justify-end">
                 <div class="w-24 h-10 bg-primary-600 rounded-lg"></div>
               </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A better way to test your skills
          </p>
        </div>
        <div class="mt-10">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-slate-50 rounded-xl p-8 hover:bg-slate-100 transition-colors border border-slate-100">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                 <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 class="text-lg font-medium text-slate-900">Instant Feedback</h3>
              <p class="mt-2 text-base text-slate-500">Get your results immediately after finishing the test with detailed analytics on correct and incorrect answers.</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-8 hover:bg-slate-100 transition-colors border border-slate-100">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                 <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h3 class="text-lg font-medium text-slate-900">Diverse Categories</h3>
              <p class="mt-2 text-base text-slate-500">From mathematics to programming, we have a wide range of categories to test your knowledge.</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-8 hover:bg-slate-100 transition-colors border border-slate-100">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                 <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h3 class="text-lg font-medium text-slate-900">Responsive Design</h3>
              <p class="mt-2 text-base text-slate-500">Take tests on any device. Our platform is fully responsive and looks beautiful everywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
