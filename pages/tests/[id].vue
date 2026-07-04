<script setup lang="ts">
import testsData from '~/data/tests.json'

const route = useRoute()
const router = useRouter()

const testId = route.params.id
const test: any = testsData.find(t => t.id === testId)

if (!test) {
  throw createError({ statusCode: 404, statusMessage: 'Test not found' })
}

const STORAGE_KEY = computed(() => `test_progress_${testId}`)

// Access logic
const hasAccess = ref(false)
const inputCode = ref('')
const variantNumber = ref('')
const userName = ref('')
const accessError = ref('')

const questions = ref<any[]>([])

const testEndTime = ref(0)
const warningsCount = ref(0)

const startTest = () => {
  if (!userName.value.trim()) {
    accessError.value = "Iltimos, ismingizni kiriting!"
    return
  }
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const expectedCode = `${hours}${minutes}`

  if (inputCode.value !== expectedCode) {
    accessError.value = "Noto'g'ri kod kiritildi!"
    return
  }
  if (!test.variants || !test.variants[variantNumber.value]) {
    accessError.value = "Noto'g'ri variant kiritildi! (1 dan 5 gacha kiriting)"
    return
  }

  const today = new Date().toISOString().split('T')[0]
  let dailyAttemptsStr = localStorage.getItem('dailyAttempts')
  let dailyAttempts = dailyAttemptsStr ? JSON.parse(dailyAttemptsStr) : { date: '', count: 0 }
  
  if (dailyAttempts.date !== today) {
    dailyAttempts = { date: today, count: 0 }
  }

  if (dailyAttempts.count >= 3) {
    accessError.value = "Ko'p urinish. Bir kunda faqat 3 marta test ishlash mumkin!"
    return
  }

  let completed = JSON.parse(localStorage.getItem(`completedVariants_${testId}`) || '[]')
  const totalVariants = Object.keys(test.variants).length
  if (completed.length >= totalVariants) {
    completed = []
    localStorage.setItem(`completedVariants_${testId}`, '[]')
  }
  
  if (completed.includes(variantNumber.value)) {
    accessError.value = "Siz bu variantni ishlagansiz. Boshqa variant tanlang."
    return
  }

  dailyAttempts.count++
  localStorage.setItem('dailyAttempts', JSON.stringify(dailyAttempts))
  completed.push(variantNumber.value)
  localStorage.setItem(`completedVariants_${testId}`, JSON.stringify(completed))
  warningsCount.value = 0

  questions.value = test.variants[variantNumber.value]
  answers.value = new Array(questions.value.length).fill(null)
  
  testEndTime.value = Date.now() + 1800 * 1000
  saveProgress()
  
  hasAccess.value = true
  
  // Start Timer
  startTimer()
}

const saveProgress = () => {
  localStorage.setItem(STORAGE_KEY.value, JSON.stringify({
    variantNumber: variantNumber.value,
    userName: userName.value,
    endTime: testEndTime.value,
    answers: answers.value,
    currentQuestionIndex: currentQuestionIndex.value,
    warningsCount: warningsCount.value
  }))
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
  const updateTimer = () => {
    const now = Date.now()
    if (now >= testEndTime.value) {
      timeLeft.value = 0
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
      submitTest() // Auto-submit when time is up
    } else {
      timeLeft.value = Math.floor((testEndTime.value - now) / 1000)
    }
  }
  
  updateTimer()
  timerInterval = setInterval(updateTimer, 1000)
}

const banUser = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  localStorage.removeItem(STORAGE_KEY.value)
  hasAccess.value = false
  accessError.value = "Siz qoidalarni 6 marta buzganingiz uchun testdan chetlatildingiz!"
}

const playWarningSound = () => {
  try {
    const audioEl = document.getElementById('warningAudio') as HTMLAudioElement | null;
    if (audioEl) {
      audioEl.currentTime = 0;
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.error('Audio error', e));
      }
    } else {
      // Fallback
      const fallbackAudio = new Audio('/faaaa.mp3');
      fallbackAudio.play().catch(e => console.error('Fallback Audio error', e));
    }
  } catch (e) {
    console.error('Audio error', e);
  }

  warningsCount.value++
  saveProgress()
  if (warningsCount.value >= 6) {
    banUser()
  }
}

const handleVisibilityChange = () => {
  if (document.hidden && hasAccess.value) {
    playWarningSound()
  }
}

const handleBlur = () => {
  if (hasAccess.value) {
    playWarningSound()
  }
}

onMounted(() => {
  const savedStr = localStorage.getItem(STORAGE_KEY.value)
  if (savedStr) {
    try {
      const saved = JSON.parse(savedStr)
      if (saved.endTime && saved.endTime > Date.now()) {
        variantNumber.value = saved.variantNumber
        userName.value = saved.userName || ''
        questions.value = test.variants[variantNumber.value]
        answers.value = saved.answers || new Array(questions.value.length).fill(null)
        currentQuestionIndex.value = saved.currentQuestionIndex || 0
        warningsCount.value = saved.warningsCount || 0
        testEndTime.value = saved.endTime
        hasAccess.value = true
        startTimer()
      } else {
        localStorage.removeItem(STORAGE_KEY.value)
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY.value)
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('blur', handleBlur)
  window.addEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (hasAccess.value) {
    if (e.key === 'Alt' || e.key === 'Meta' || e.altKey || e.metaKey || (e.ctrlKey && e.key === 'd') || /^F\d+$/.test(e.key)) {
      e.preventDefault()
      playWarningSound()
    }
  }
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('blur', handleBlur)
  window.removeEventListener('keydown', handleKeyDown)
})

// Question Logic
const currentQuestionIndex = ref(0)
const answers = ref<any[]>([])

watch(answers, () => {
  if (hasAccess.value && timerInterval) {
    saveProgress()
  }
}, { deep: true })

watch(currentQuestionIndex, () => {
  if (hasAccess.value && timerInterval) {
    saveProgress()
  }
})

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
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  localStorage.removeItem(STORAGE_KEY.value)
  
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

  // Mahalliy tarixga saqlash
  const testRecord = {
    id: Date.now().toString(),
    userName: userName.value,
    testTitle: sharedResult.value.testTitle,
    score: sharedResult.value.score,
    total: sharedResult.value.total,
    date: new Date().toISOString(),
    timeTakenMinutes: Math.ceil((1800 - timeLeft.value) / 60),
    details: sharedResult.value.details
  }
  
  const historyStr = localStorage.getItem('allTestResults')
  let history = []
  if (historyStr) {
    try { history = JSON.parse(historyStr) } catch(e){}
  }
  history.push(testRecord)
  localStorage.setItem('allTestResults', JSON.stringify(history))

  router.push('/results')
}
</script>

<template>
  <div>
    <audio id="warningAudio" src="/faaaa.mp3" preload="auto"></audio>
    <!-- Access Gateway -->
    <div v-if="!hasAccess" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12 animate-fade-in max-w-lg mx-auto text-center">
      <h1 class="text-2xl font-bold text-slate-900 mb-2">{{ test.title }}</h1>
      <p class="text-slate-500 mb-8">Testni boshlash uchun variant raqamini va maxfiy kodni kiriting.</p>
      
      <div class="space-y-4 mb-8 text-left">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Ismingiz</label>
          <input type="text" autocomplete="off" v-model="userName" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="Ismingizni kiriting">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Variant (1-5)</label>
          <input type="number" autocomplete="off" min="1" max="5" v-model="variantNumber" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="Masalan: 1">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Test Kodi</label>
          <input type="password" autocomplete="new-password" v-model="inputCode" @keyup.enter="startTest" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="Kodni kiriting">
        </div>
        <p v-if="accessError" class="text-red-500 text-sm mt-2 font-medium">{{ accessError }}</p>
      </div>

      <button @click="startTest" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm">
        Testni Boshlash
      </button>
      </div>
    </div>

    <!-- Test Interface -->
    <div v-else class="fixed inset-0 z-50 bg-slate-50 overflow-y-auto w-full h-full">
      <!-- Penalties -->
      <div class="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white px-4 py-3 rounded-2xl shadow-xl border border-red-100 z-[60] flex flex-col items-center animate-fade-in">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Jarimalar</span>
        <span class="text-3xl font-black" :class="warningsCount > 0 ? 'text-red-500' : 'text-slate-800'">{{ warningsCount }}/6</span>
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col">
        <div class="mb-8 flex items-center justify-between animate-fade-in sticky top-0 bg-slate-50/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-slate-200 z-40">
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
  </div>
</template>
