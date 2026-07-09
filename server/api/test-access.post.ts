import { readBody } from 'h3'
import fs from 'node:fs'
import path from 'node:path'

const filePath = path.resolve('server/data/completed_tests.json')

function readData() {
  if (!fs.existsSync(filePath)) {
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify([]))
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (e) {
    return []
  }
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

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

  const data = readData()

  // Shu odam bugun nechta test yechgani? (Variantlar soni bo'yicha cheklov 3 marta edi, lekin menimcha endi har bir test o'ziga xos)
  const userDailyAttempts = data.filter((item: any) => item.userName === userNameLower && item.date === today)
  
  if (userDailyAttempts.length >= 3) {
    return {
      success: false,
      message: "Ko'p urinish. Bir kunda faqat 3 marta test ishlash mumkin!"
    }
  }

  // Shu odam aynan shu testning shu variantini ishlaganmi?
  const alreadyCompleted = data.find((item: any) => 
    item.userName === userNameLower && 
    item.testId === testId && 
    item.variantNumber === String(variantNumber)
  )

  if (alreadyCompleted) {
    return {
      success: false,
      message: "Siz bu variantni ishlagansiz. Boshqa variant tanlang yoki o'qituvchiga murojaat qiling."
    }
  }

  return {
    success: true,
    message: "Ruxsat berildi"
  }
})
