/* eslint-disable no-undef */
import { delay, randomInteger } from './helpers'

/**
 * Имитирует пользовательскую активность в рамках ширины и высоты браузера.
 * @param page - страница браузера Puppeteer
 * @param width - заданная ширина страницы
 * @param height - заданная высота страницы
 * @returns {Promise<void>}
 */
export async function randomUserInteractions (page, width, height) {
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
export async function pageInit (browser, width, height) {
  const page = await browser.newPage()

  await page.goto('https://demoserver.dev/#/', { waitUntil: 'domcontentloaded' })
  await randomUserInteractions(page, width, height)
  console.log('\x1b[36m%s\x1b[0m', 'Ожидаю наблюдаемый селектор в DOM.') // голубой
  return page
}

/**
 * Забираем данные из запущенного на сервере браузера.
 * @param page
 * @returns {Promise<void>}
 */
export async function tryToParse (page) {
  try {
    await page.waitForSelector('.live.content .event:nth-child(3) .dataset-value', { timeout: 15000 })
    console.log('\x1b[32m%s\x1b[0m', 'Успешно подключились.') // зелёный

    await page.evaluate(() => {
      const observers = []
      const timesRan = [0, 0, 0]
      const len = 3 // Жёстко ожидаем 3 строки

      for (let i = 0; i < len; i++) {
        const observer = new MutationObserver(async (mutations) => {
          const thread = []
          let sets = [[], []]

          sets.push(i)

          for (var mutation of mutations) {
            if (mutation.addedNodes.length && mutation.addedNodes[0].innerHTML !== '' && mutation.addedNodes[0].innerHTML !== undefined) {
              thread.push(mutation.addedNodes[0].innerHTML)
            }
          }

          const threadLength = thread.length
          const halfLength = threadLength / 2

          if (threadLength > 0) {
            if (timesRan[i] !== 0) {
              for (let j = 0; j < threadLength; j++) {
                if (j < halfLength) {
                  sets[0].push(thread[j])
                } else {
                  sets[1].push(thread[j])
                }
              }
            } else {
              const dataFromHTML = await parseDataFromHtml(`${thread[0]}${thread[1]}`)

              sets[0] = dataFromHTML[0]
              sets[1] = dataFromHTML[1]
            }

            showHTMLNodeContent(' ')
            showHTMLNodeContent(' ')
            showHTMLNodeContent(`===== Наблюдатель ${sets[2] + 1}, проход ${timesRan[i]} =====`, '\x1b[36m%s\x1b[0m')
            showHTMLNodeContent(' ')
            showHTMLNodeContent(`Набор данных:`)
            showHTMLNodeContent(`${sets[0]}`)
            showHTMLNodeContent(`${sets[1]}`)
            showHTMLNodeContent(' ')
            showHTMLNodeContent('===================================', '\x1b[36m%s\x1b[0m')

            timesRan[i]++
          }
        })

        observers.push(observer.observe(document.querySelectorAll('.live.content .event')[i], { attributes: false, childList: true, subtree: true }))
      }
    })
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err.message) // красный
    await delay(1000)
    console.log('Перезапускаю...')
    await page.reload(10, { waitUntil: 'domcontentloaded' })
    await tryToParse(page)
  }
}
