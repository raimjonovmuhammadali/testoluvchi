import { readBody } from 'h3'
import { createClient } from 'redis'

const client = createClient({
  url: process.env.REDIS_URL
})

client.on('error', (err) => console.error('Redis Client Error', err));

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userName, testId, variantNumber } = body

  if (!userName || !testId || !variantNumber) {
    return {
      success: false,
      message: 'Ma\'lumotlar to\'liq emas!'
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const userNameLower = userName.toLowerCase().trim()

  try {
    if (!client.isOpen) {
      await client.connect()
    }

    // Kunlik urinishlarni tekshirish. (1 kunda max 3 marta)
    const dailyKey = `daily_attempts_${today}_${userNameLower}`
    const attemptsStr = await client.get(dailyKey)
    const attempts: number = attemptsStr ? parseInt(attemptsStr, 10) : 0

    if (attempts >= 3) {
      return {
        success: false,
        message: "Ko'p urinish. Bir kunda faqat 3 marta test ishlash mumkin!"
      }
    }

    // Aniq shu variantni ishlaganmi yo'qmi tekshirish
    const completedKey = `test_${testId}_variant_${variantNumber}_user_${userNameLower}`
    const alreadyCompleted = await client.get(completedKey)

    if (alreadyCompleted) {
      return {
        success: false,
        message: "Siz bu variantni ishlagansiz. Boshqa variant tanlang."
      }
    }

    // Ruxsat berish va kunlik urinishni bittaga oshirish
    await client.set(dailyKey, String(attempts + 1), { EX: 86400 }) // 24 soatga saqlash

    return {
      success: true,
      message: "Ruxsat berildi"
    }
  } catch (error) {
    console.error("KV Error:", error)
    return {
      success: false,
      message: "Server bilan bog'lanishda xato (KV o'rnatilmagan bo'lishi mumkin)"
    }
  }
})
