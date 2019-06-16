/* eslint-disable no-undef */
import { delay, randomInteger } from './helpers'
import cheerio from 'cheerio'

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
 * Определяем, сколько асинхронных потоков нужны
 * для отслеживания селектора ".event".
 * @param body - строка, innerHTML страницы ("body").
 * @returns {number}
 */
export function defineThreadsNumber (body) {
  const $ = cheerio.load((`${body}`).replace(/(?:\r\n|\r|\n)/g, ''))

  return $('.event').length
}

/**
 * Забираем данные из запущенного на сервере браузера.
 * @param page
 * @param observableSelector - селектор, чьё обновление мы отслеживаем
 * @returns {Promise<void>}
 */
export async function tryToParse (page, observableSelector) {
  try {
    await page.waitForSelector(observableSelector, { timeout: 15000 })
    console.log('\x1b[32m%s\x1b[0m', 'Успешно подключились.') // зелёный

    const bodyHandle = await page.$('body')
    const body = await page.evaluate(body => body.innerHTML, bodyHandle)
    const threadsNumber = defineThreadsNumber(body)

    await page.evaluate(({ threadsNumber, observableSelector, body }) => {
      const observers = []
      const timesRan = [] // Количество проходов

      for (let i = 0; i < threadsNumber; i++) {
        timesRan.push(0)
      }

      for (let i = 0; i < threadsNumber; i++) {
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
              // const datasetTitles = await parseTitles(`${body}`)
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
            saveToDb(i, sets[0], sets[1])
            showHTMLNodeContent(' ')
            showHTMLNodeContent('===================================', '\x1b[36m%s\x1b[0m')

            timesRan[i]++
          }
        })

        observers.push(observer.observe(document.querySelectorAll(observableSelector)[i], { attributes: false, childList: true, subtree: true }))
      }
    }, { threadsNumber, observableSelector, body })
    await bodyHandle.dispose()
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err.message) // красный
    await delay(1000)
    console.log('Перезапускаю...')
    await page.reload(10, { waitUntil: 'domcontentloaded' })
    await tryToParse(page, observableSelector)
  }
}
