/* eslint-disable no-undef */
import puppeteer from 'puppeteer'

const minWidth = 1200
const minHeight = 720
const maxWidth = 1920
const maxHeight = 1000

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
}

/**
 * Функция задержки исполнения.
 * @param milliseconds
 * @returns {Promise<any>}
 */
const delay = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Генерирует случайное целое в заданном диапазоне.
 * @param min
 * @param max
 * @returns {number}
 */
function randomInteger (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)

  return Math.round(rand)
}

/**
 * Имитирует пользовательскую активность в рамках ширины и высоты браузера.
 * @param page - страница браузера Puppeteer
 * @param width - заданная ширина страницы
 * @param height - заданная высота страницы
 * @returns {Promise<void>}
 */
async function randomUserInteractions (page, width, height) {
  const interactions = randomInteger(2, 6)

  async function loop (interactions) {
    for (let i = 0; i < interactions; i++) {
      const endPoint = []

      endPoint[0] = randomInteger(0, width)
      endPoint[1] = randomInteger(0, height)
      console.log(`Запускаю движение мышью к ${endPoint[0]}, ${endPoint[1]}.`)
      await page.mouse.move(endPoint[0], endPoint[1], { steps: randomInteger(1, 5) })
      console.log('Имитирую клик.')
      await page.mouse.click(endPoint[0], endPoint[1])

      const pause = randomInteger(500, 2500)

      console.log(`Задержка ${pause} мс.`)
      await delay(pause)
    }
  }

  await loop(interactions)
}

/**
 * Инициализирует страницу браузера с заданным урлом.
 * @param browser - экземпляр браузера Puppeteer
 * @param width - ширина браузера
 * @param height - высота браузера
 * @returns {Promise<*>}
 */
async function pageInit (browser, width, height) {
  const page = await browser.newPage()

  await page.goto('https://demoserver.dev/#/', { waitUntil: 'domcontentloaded' })
  await randomUserInteractions(page, width, height)
  console.log('\x1b[36m%s\x1b[0m', 'Ожидаю наблюдаемый селектор в DOM.') // голубой
  return page
}

async function tryToParse (page) {
  try {
    console.log('\x1b[32m%s\x1b[0m', 'Успешно подключились.') // зелёный
    await page.waitForSelector('.live.content .event:nth-child(3)', { timeout: 20000 })

    await page.evaluate(() => {
      const observers = []
      const len = 3 // Жёстко ожидаем 3 строки

      for (let i = 0; i < len; i++) {
        const observer = new MutationObserver((mutations) => {
          const thread = []
          const sets = [[], []]

          sets.push(i)

          for (var mutation of mutations) {
            if (mutation.addedNodes.length && mutation.addedNodes[0].innerHTML !== '' && mutation.addedNodes[0].innerHTML !== undefined) {
              thread.push(mutation.addedNodes[0].innerHTML)
            }
          }

          const threadLength = thread.length
          const halfLength = threadLength / 2

          if (threadLength > 0) {
            for (let i = 0; i < threadLength; i++) {
              if (i < halfLength) {
                sets[0].push(thread[i])
              } else {
                sets[1].push(thread[i])
              }
            }

            showHTMLNodeContent(' ')
            showHTMLNodeContent(' ')
            showHTMLNodeContent('===== пакет мутаций, начало =====', '\x1b[36m%s\x1b[0m')
            showHTMLNodeContent(`Наблюдатель ${sets[2] + 1}, набор данных:`)
            showHTMLNodeContent(`${sets[0]}`)
            showHTMLNodeContent(`${sets[1]}`)
            showHTMLNodeContent(' ')
            showHTMLNodeContent('===== пакет мутаций, конец =====', '\x1b[36m%s\x1b[0m')
          }
        })

        observers.push(observer.observe(document.querySelectorAll('.live.content .event')[i], { attributes: false, childList: true, subtree: true }))
      }
    })
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err.message) // красный
    await delay(10000)
    console.log('Перезапускаю...')
    await tryToParse(page)
  }
}

/**
 * Модуль, где запускаем браузер и следим за данными.
 */
(async () => {
  const width = randomInteger(minWidth, maxWidth)
  const height = randomInteger(minHeight, maxHeight)

  console.log('\x1b[35m%s\x1b[0m', `Viewport: ${width} x ${height}`) // сиреневый

  const browser = await puppeteer.launch({ headless: false, defaultViewport: { width, height } })
  const page = await pageInit(browser, width, height)

  await page.exposeFunction('showHTMLNodeContent', function (a, b) {
    if (!b) {
      b = ''
    }

    console.log(b, a.replace(/\s\s+/g, ' ').trim())
  })

  await tryToParse(page)
})()
