<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'

const history = ref<any[]>([])

onMounted(() => {
  const historyStr = localStorage.getItem('allTestResults')
  if (historyStr) {
    try {
      history.value = JSON.parse(historyStr).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch(e) {
      console.error(e)
    }
  }
})

const getGradeColor = (percent: number) => {
  if (percent >= 80) return 'text-green-500'
  if (percent >= 60) return 'text-yellow-500'
  return 'text-red-500'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('uz-UZ', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}

// PDF Download Logic
const showCodeModal = ref(false)
const inputCode = ref('')
const accessError = ref('')
const selectedRecord = ref<any>(null)
const isGenerating = ref(false)

const openDownloadModal = (record: any) => {
  selectedRecord.value = record
  inputCode.value = ''
  accessError.value = ''
  showCodeModal.value = true
}

const downloadPDF = async () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const expectedCode = `${hours}${minutes}`

  if (inputCode.value !== expectedCode) {
    accessError.value = "Noto'g'ri kod kiritildi!"
    return
  }

  showCodeModal.value = false
  isGenerating.value = true

  await nextTick()

  try {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('pdf-template')
    if (element) {
      const opt = {
        margin: 10,
        filename: `${selectedRecord.value.userName.replace(/\s+/g, '_')}_Natija.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      
      // Temporarily make it visible for printing
      element.style.display = 'block'
      await html2pdf().from(element).set(opt).save()
      element.style.display = 'none'
    }
  } catch(e) {
    console.error('PDF generation error', e)
    alert("PDF generatsiyasida xatolik yuz berdi. Konsolni tekshiring.")
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900">Mening Natijalarim</h1>
        <p class="text-slate-500 mt-2">Barcha yechilgan testlar tarixi shu yerda saqlanadi.</p>
      </div>
    </div>

    <div v-if="history.length === 0" class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
      <div class="w-20 h-20 mx-auto bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">Hali natijalar yo'q</h3>
      <p class="text-slate-500 mb-6">Siz hozircha hech qanday test ishlaganingiz yo'q.</p>
      <NuxtLink to="/tests" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-colors">
        Test ishlashni boshlash
      </NuxtLink>
    </div>

    <div v-else class="grid gap-6">
      <div v-for="record in history" :key="record.id" class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h3 class="text-lg font-bold text-slate-900">{{ record.testTitle }}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{{ record.userName }}</span>
            </div>
            <div class="flex items-center text-sm text-slate-500 gap-4">
              <span class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>{{ formatDate(record.date) }}</span>
              <span class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{{ record.timeTakenMinutes }} daqiqa</span>
            </div>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="text-right">
              <p class="text-sm text-slate-500 mb-0.5">Natija</p>
              <div class="flex items-end gap-2">
                <span class="text-2xl font-bold" :class="getGradeColor(Math.round((record.score / record.total) * 100))">
                  {{ Math.round((record.score / record.total) * 100) }}%
                </span>
                <span class="text-sm font-medium text-slate-500 mb-1">{{ record.score }}/{{ record.total }}</span>
              </div>
            </div>
            <button @click="openDownloadModal(record)" :disabled="isGenerating" class="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 text-primary-600 hover:bg-primary-50 flex items-center justify-center transition-colors border border-slate-200">
              <svg v-if="!isGenerating" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              <svg v-else class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Code -->
    <div v-if="showCodeModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-slide-up">
        <h3 class="text-lg font-bold text-slate-900 mb-2">Maxfiy kodni kiriting</h3>
        <p class="text-sm text-slate-500 mb-6">PDF yuklab olish uchun joriy soat kodini (HHMM) kiriting.</p>
        
        <input type="password" autocomplete="new-password" v-model="inputCode" @keyup.enter="downloadPDF" placeholder="Masalan: 1146" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors text-center text-lg tracking-widest mb-2">
        <p v-if="accessError" class="text-red-500 text-sm font-medium mb-4">{{ accessError }}</p>
        
        <div class="flex gap-3 mt-6">
          <button @click="showCodeModal = false" class="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">Yopish</button>
          <button @click="downloadPDF" class="flex-1 px-4 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">Yuklash</button>
        </div>
      </div>
    </div>

    <!-- Hidden PDF Template -->
    <div v-if="selectedRecord" id="pdf-template" class="bg-white p-8" style="display: none; width: 800px; max-width: 800px;">
      <div class="text-center border-b pb-6 mb-6">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Test Natijasi</h1>
        <h2 class="text-xl text-slate-600">{{ selectedRecord.testTitle }}</h2>
      </div>

      <div class="grid grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-xl">
        <div>
          <p class="text-sm text-slate-500">Ismi familiyasi</p>
          <p class="font-bold text-lg text-slate-900">{{ selectedRecord.userName }}</p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Topshirilgan vaqt</p>
          <p class="font-bold text-lg text-slate-900">{{ formatDate(selectedRecord.date) }}</p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Sarflangan vaqt</p>
          <p class="font-bold text-lg text-slate-900">{{ selectedRecord.timeTakenMinutes }} daqiqa</p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Natija foizi</p>
          <p class="font-bold text-2xl" :class="getGradeColor(Math.round((selectedRecord.score / selectedRecord.total) * 100))">
            {{ Math.round((selectedRecord.score / selectedRecord.total) * 100) }}% ({{ selectedRecord.score }} / {{ selectedRecord.total }})
          </p>
        </div>
      </div>

      <div>
        <h3 class="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Savollar tahlili</h3>
        <div class="space-y-4">
          <div v-for="(detail, index) in selectedRecord.details" :key="index" class="p-4 rounded-lg border bg-slate-50 border-slate-200">
            <div class="flex gap-3">
              <div class="mt-0.5">
                <span class="font-bold text-primary-600">{{ index + 1 }}.</span>
              </div>
              <div>
                <p class="font-semibold text-slate-900 mb-2">{{ detail.question }}</p>
                <div class="text-sm space-y-1">
                  <p class="text-slate-700">
                    <span class="font-medium">Sizning javobingiz:</span> 
                    {{ detail.type === 'choice' ? (detail.userAnswer !== null && detail.userAnswer !== -1 ? detail.options[detail.userAnswer] : 'Belgilanmagan') : (detail.userAnswer || 'Yozilmagan') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center text-sm text-slate-400 border-t pt-4">
        Testoluvchi platformasi orqali generatsiya qilindi • {{ new Date().getFullYear() }}
      </div>
    </div>
  </div>
</template>
