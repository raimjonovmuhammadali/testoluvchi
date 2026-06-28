<script setup lang="ts">
interface TestResult {
  testTitle: string;
  score: number;
  total: number;
  details: {
    question: string;
    type: string;
    userAnswer: any;
    correctAnswer: any;
    isCorrect: boolean;
    options?: string[];
  }[];
}
const sharedResult = useState<TestResult | null>('testResult')
const router = useRouter()

// If accessed directly without completing a test, redirect to tests
if (!sharedResult.value) {
  router.push('/tests')
}

const percentage = computed(() => {
  if (!sharedResult.value) return 0
  return Math.round((sharedResult.value.score / sharedResult.value.total) * 100)
})

const getGradeColor = (percent: number) => {
  if (percent >= 80) return 'text-green-500'
  if (percent >= 60) return 'text-yellow-500'
  return 'text-red-500'
}

// Answer Gateway
const showAnswers = ref(false)
const inputCode = ref('')
const accessError = ref('')

const verifyCode = () => {
  if (inputCode.value === '1511') {
    showAnswers.value = true
  } else {
    accessError.value = "Noto'g'ri kod kiritildi!"
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" v-if="sharedResult">
    <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-slide-up">
      
      <!-- Answers Gateway (Hidden State) -->
      <div v-if="!showAnswers" class="p-8 sm:p-16 flex flex-col items-center text-center">
        <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Test Yakunlandi!</h1>
        <p class="text-lg text-slate-500 mb-8 max-w-md">Javoblaringiz tizimga qabul qilindi. Natijani va xatolaringizni ko'rish uchun maxfiy kodni kiriting.</p>
        
        <div class="w-full max-w-sm space-y-4">
          <input type="password" v-model="inputCode" @keyup.enter="verifyCode" placeholder="Maxfiy kod (1511)" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors text-center text-lg tracking-widest">
          <p v-if="accessError" class="text-red-500 text-sm font-medium">{{ accessError }}</p>
          <button @click="verifyCode" class="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm">
            Natijani Ko'rish
          </button>
        </div>
        
        <div class="mt-8">
          <NuxtLink to="/tests" class="text-slate-500 hover:text-slate-700 font-medium underline decoration-slate-300 underline-offset-4">Boshqa test ishlash</NuxtLink>
        </div>
      </div>

      <!-- Results & Breakdown (Visible State) -->
      <div v-else class="animate-fade-in">
        <!-- Header / Score Summary -->
        <div class="bg-slate-50 p-8 sm:p-12 text-center border-b border-slate-200">
          <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Test Natijalari</h1>
          <p class="text-lg text-slate-500 mb-8">{{ sharedResult.testTitle }}</p>
          
          <div class="relative inline-flex items-center justify-center w-48 h-48 rounded-full bg-white shadow-inner border border-slate-100 mb-6">
            <div class="absolute inset-2 rounded-full border-4 border-slate-100"></div>
            <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" class="stroke-slate-100" stroke-width="8" />
              <circle cx="50" cy="50" r="46" fill="none" 
                      :class="[percentage >= 80 ? 'stroke-green-500' : percentage >= 60 ? 'stroke-yellow-500' : 'stroke-red-500']" 
                      stroke-width="8" 
                      stroke-linecap="round" 
                      :stroke-dasharray="`${(percentage / 100) * 289} 289`" />
            </svg>
            <div class="text-center relative z-10">
              <span class="text-5xl font-extrabold" :class="getGradeColor(percentage)">{{ percentage }}%</span>
            </div>
          </div>
          
          <p class="text-xl font-medium text-slate-700">
            Siz <span class="font-bold text-slate-900">{{ sharedResult.total }}</span> ta savoldan <span class="font-bold text-slate-900">{{ sharedResult.score }}</span> ta to'g'ri topdingiz.
          </p>
        </div>

        <!-- Detailed Breakdown -->
        <div class="p-8 sm:p-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">Batafsil Tahlil</h2>
            <NuxtLink to="/tests" class="text-sm text-primary-600 hover:text-primary-700 font-medium">Boshqa test ishlash</NuxtLink>
          </div>
          
          <div class="space-y-6">
            <div v-for="(detail, index) in sharedResult.details" :key="index" 
                 class="p-6 rounded-2xl border" 
                 :class="detail.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'">
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-0.5">
                  <svg v-if="detail.isCorrect" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <svg v-else class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div class="ml-4 flex-grow">
                  <h3 class="text-base font-semibold text-slate-900 mb-3">{{ index + 1 }}. {{ detail.question }}</h3>
                  <div class="space-y-2">
                    <div class="flex items-center text-sm" :class="detail.isCorrect ? 'text-green-700' : 'text-slate-600'">
                      <span class="font-medium w-32 flex-shrink-0">Sizning javob:</span>
                      <span v-if="detail.type === 'choice'">
                        {{ (detail.userAnswer !== null && detail.userAnswer !== -1 && detail.options) ? detail.options[detail.userAnswer as number] : 'Belgilanmagan' }}
                      </span>
                      <span v-else-if="detail.type === 'code'" class="font-mono bg-white/50 px-2 py-1 rounded break-all">
                        {{ detail.userAnswer || 'Yozilmagan' }}
                      </span>
                      <span v-else>
                        {{ detail.userAnswer || 'Yozilmagan' }}
                      </span>
                    </div>
                    <div v-if="!detail.isCorrect" class="flex items-center text-sm text-green-700">
                      <span class="font-medium w-32 flex-shrink-0">To'g'ri javob:</span>
                      <span v-if="detail.type === 'choice'">
                        {{ detail.options ? detail.options[detail.correctAnswer as number] : '' }}
                      </span>
                      <span v-else-if="detail.type === 'code'" class="font-mono bg-white/50 px-2 py-1 rounded break-all">
                        {{ detail.correctAnswer }}
                      </span>
                      <span v-else>
                        {{ detail.correctAnswer }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
