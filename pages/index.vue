<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left animate-slide-up">
              <h1 class="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Bilimlaringizni sinash uchun</span>
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 xl:inline mt-1">Premium Testlar</span>
              </h1>
              <p class="mt-4 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Matematika, Dasturlash va boshqa yo'nalishlar bo'yicha o'z bilimlaringizni sinab ko'ring. Aniq natijalar va batafsil tahlillarga ega bo'ling.
              </p>
              <div class="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <div class="rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <NuxtLink to="/tests" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 md:py-4 md:text-lg transition-colors">
                    Boshlash
                  </NuxtLink>
                </div>
                <div class="mt-3 sm:mt-0 rounded-xl">
                  <NuxtLink to="/tests" class="w-full flex items-center justify-center px-8 py-3 border border-primary-200 text-base font-bold rounded-xl text-primary-700 bg-primary-50 hover:bg-primary-100 hover:border-primary-300 shadow-sm md:py-4 md:text-lg transition-all duration-300">
                    Testlarni ko'rish
                  </NuxtLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 overflow-hidden flex items-center justify-center">
        <!-- Abstract Illustration or Shape -->
        <div class="relative w-full h-full flex items-center justify-center p-12">
            <div class="absolute w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
            <div class="absolute w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow" style="animation-delay: 1s; transform: translate(50px, 50px)"></div>
            <div class="relative z-10 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/50 max-w-sm w-full">
               <div class="w-full h-4 bg-slate-200 rounded-md mb-4"></div>
               <div class="w-3/4 h-4 bg-slate-200 rounded-md mb-8"></div>
               <div class="space-y-4">
                 <div class="flex items-center gap-4">
                    <div class="w-6 h-6 rounded-full border-[3px] border-primary-500 flex items-center justify-center shadow-sm"><div class="w-2.5 h-2.5 bg-primary-500 rounded-full"></div></div>
                    <div class="w-full h-12 bg-primary-50 border border-primary-100 rounded-xl shadow-inner"></div>
                 </div>
                 <div class="flex items-center gap-4">
                    <div class="w-6 h-6 rounded-full border-[3px] border-slate-300"></div>
                    <div class="w-full h-12 border border-slate-200 bg-slate-50/50 rounded-xl"></div>
                 </div>
                 <div class="flex items-center gap-4">
                    <div class="w-6 h-6 rounded-full border-[3px] border-slate-300"></div>
                    <div class="w-full h-12 border border-slate-200 bg-slate-50/50 rounded-xl"></div>
                 </div>
               </div>
               <div class="mt-8 flex justify-end">
                 <div class="w-28 h-12 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl shadow-md"></div>
               </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-sm text-primary-600 font-bold tracking-widest uppercase shadow-sm inline-block px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-4">Imkoniyatlar</h2>
          <p class="mt-2 text-3xl leading-9 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Bilimni sinashning eng qulay va zamonaviy usuli
          </p>
        </div>
        <div class="mt-16">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 shadow-sm group">
              <div class="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                 <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Tezkor Natijalar</h3>
              <p class="mt-3 text-base text-slate-500 leading-relaxed">Testni yakunlashingiz bilan to'g'ri va noto'g'ri javoblaringiz bo'yicha batafsil tahliliy natijalarni darhol oling.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 shadow-sm group">
              <div class="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                 <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Turli Yo'nalishlar</h3>
              <p class="mt-3 text-base text-slate-500 leading-relaxed">Matematikadan tortib dasturlashgacha, bilimingizni sinab ko'rish uchun ko'plab fanlar va test variantlari mavjud.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 shadow-sm group">
              <div class="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                 <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Moslashuvchan Dizayn</h3>
              <p class="mt-3 text-base text-slate-500 leading-relaxed">Testlarni istalgan qurilmada ishlashingiz mumkin. Platformamiz kompyuter, planshet va smartfonlarga mukammal moslashgan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
