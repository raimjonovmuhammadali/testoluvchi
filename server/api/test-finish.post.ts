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

  // Tekshirish: oldin yozilmagan bo'lsa qo'shamiz
  const alreadyCompleted = data.find((item: any) => 
    item.userName === userNameLower && 
    item.testId === testId && 
    item.variantNumber === String(variantNumber)
  )

  if (!alreadyCompleted) {
    data.push({
      userName: userNameLower,
      testId,
      variantNumber: String(variantNumber),
      date: today,
      timestamp: Date.now()
    })
    writeData(data)
  }

  return {
    success: true,
    message: "Natija saqlandi"
  }
})
