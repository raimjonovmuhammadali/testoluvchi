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

  const userNameLower = userName.toLowerCase().trim()
  const completedKey = `test_${testId}_variant_${variantNumber}_user_${userNameLower}`

  try {
    if (!client.isOpen) {
      await client.connect()
    }

    // Ushbu variantni ishlaganini saqlab qo'yish
    await client.set(completedKey, 'true')

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
