import { readBody } from 'h3'
import { createClient } from '@vercel/kv'

const kv = createClient({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || ''
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userName, testId, variantNumber } = body

  if (!userName || !testId || !variantNumber) {
    return {
      success: false,
      message: 'Ma\'lumotlar to\'liq emas!'
    }
  }

  const userNameLower = userName.toLowerCase().trim()
  const completedKey = `test_${testId}_variant_${variantNumber}_user_${userNameLower}`

  try {
    // Ushbu variantni ishlaganini saqlab qo'yish
    await kv.set(completedKey, true)

    return {
      success: true,
      message: "Natija saqlandi"
    }
  } catch (error) {
    console.error("KV Error:", error)
    return {
      success: false,
      message: "KV saqlashda xatolik yuz berdi"
    }
  }
})
