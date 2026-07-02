<script setup lang="ts">
import testsData from '~/data/tests.json'

const route = useRoute()
const router = useRouter()

const testId = route.params.id
const test: any = testsData.find(t => t.id === testId)

if (!test) {
  throw createError({ statusCode: 404, statusMessage: 'Test not found' })
}

// Access logic
const hasAccess = ref(false)
const inputCode = ref('')
const variantNumber = ref('')
const accessError = ref('')

const questions = ref<any[]>([])

const startTest = () => {
  if (inputCode.value !== '1611') {
    accessError.value = "Noto'g'ri kod kiritildi!"
    return
  }
  if (!test.variants || !test.variants[variantNumber.value]) {
    accessError.value = "Noto'g'ri variant kiritildi! (1 dan 5 gacha kiriting)"
    return
  }

  questions.value = test.variants[variantNumber.value]
  answers.value = new Array(questions.value.length).fill(null)
  hasAccess.value = true
  
  // Start Timer
  startTimer()
}

// Timer logic (30 mins = 1800 secs)
const timeLeft = ref(1800)
let timerInterval: any = null

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      submitTest() // Auto-submit when time is up
    }
  }, 1000)
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// Question Logic
const currentQuestionIndex = ref(0)
const answers = ref<any[]>([])

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)
const allAnswered = computed(() => answers.value.every(ans => ans !== null && ans !== ''))

const nextQuestion = () => {
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// We use state to share results with the result page since it's a static app without backend
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
const sharedResult = useState<TestResult | null>('testResult', () => null)

const submitTest = () => {
  if (timerInterval) clearInterval(timerInterval)
  
  let correctCount = 0
  const detailedResults = questions.value.map((q, index) => {
    let isCorrect = false;
    let correctAnswer: any = null;
    let userAnswer = answers.value[index];

    if (q.type === 'choice') {
      correctAnswer = q.correctAnswerIndex;
      isCorrect = q.correctAnswerIndex === userAnswer;
    } else if (q.type === 'text') {
      correctAnswer = q.correctAnswerText;
      if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
        isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      }
    } else if (q.type === 'code') {
      correctAnswer = q.correctAnswerCode;
      if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
        isCorrect = userAnswer.replace(/\s+/g, '') === correctAnswer.replace(/\s+/g, '');
      }
    }

    if (isCorrect) correctCount++
    return {
      question: q.text,
      type: q.type,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      isCorrect,
      options: q.options
    }
  })

  sharedResult.value = {
    testTitle: `${test.title} (Variant ${variantNumber.value})`,
    score: correctCount,
    total: questions.value.length,
    details: detailedResults
  }

  router.push('/results')
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Access Gateway -->
    <div v-if="!hasAccess" class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12 animate-fade-in max-w-lg mx-auto text-center">
      <h1 class="text-2xl font-bold text-slate-900 mb-2">{{ test.title }}</h1>
      <p class="text-slate-500 mb-8">Testni boshlash uchun variant raqamini va maxfiy kodni kiriting.</p>
      
      <div class="space-y-4 mb-8 text-left">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Variant (1-5)</label>
          <input type="number" min="1" max="5" v-model="variantNumber" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="Masalan: 1">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Test Kodi</label>
          <input type="password" v-model="inputCode" @keyup.enter="startTest" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="Kodni kiriting">
        </div>
        <p v-if="accessError" class="text-red-500 text-sm mt-2 font-medium">{{ accessError }}</p>
      </div>

      <button @click="startTest" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm">
        Testni Boshlash
      </button>
    </div>

    <!-- Test Interface -->
    <div v-else>
      <div class="mb-8 flex items-center justify-between animate-fade-in sticky top-20 bg-slate-50/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-slate-200 z-40">
        <div>
          <h1 class="text-xl font-bold text-slate-900">Variant {{ variantNumber }}</h1>
          <p class="text-sm text-slate-500">{{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
        </div>
        <div class="text-right flex items-center gap-3">
          <div class="inline-flex items-center px-3 py-1.5 rounded-lg font-mono font-bold text-sm transition-colors" :class="timeLeft < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-primary-100 text-primary-700'">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {{ formattedTime }}
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-slate-200 rounded-full h-2.5 mb-8 overflow-hidden">
        <div class="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out" :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"></div>
      </div>

      <!-- Question Component -->
      <div :key="currentQuestion.id">
        <QuestionItem 
          :question="currentQuestion" 
          :question-number="currentQuestionIndex + 1"
          v-model="answers[currentQuestionIndex]"
        />
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between mt-8 border-t border-slate-200 pt-6">
        <button 
          @click="prevQuestion" 
          :disabled="currentQuestionIndex === 0"
          class="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Oldingi
        </button>

        <button 
          v-if="!isLastQuestion"
          @click="nextQuestion" 
          class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm"
        >
          Keyingi
        </button>

        <button 
          v-else
          @click="submitTest" 
          class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm"
          :class="allAnswered ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-400'"
        >
          Testni Yakunlash
        </button>
      </div>
      
      <div v-if="isLastQuestion && !allAnswered" class="mt-4 text-center text-sm text-amber-600">
        Barcha savollarga javob bermadingiz. Shunday bo'lsada, yakunlashingiz mumkin.
      </div>
    </div>
  </div>
</template>
