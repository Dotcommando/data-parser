import puppeteer from 'puppeteer'
import { tryToParse, pageInit } from './data-parser'
import { randomInteger } from './helpers'
import cheerio from 'cheerio'
import './config/database'
import config from './config/constants'
import DataSet from './models/dataset.model'

const minWidth = 1200
const minHeight = 720
const maxWidth = 1920
const maxHeight = 1000

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
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
  const observableSelector = config.observableSelector

  await page.exposeFunction('showHTMLNodeContent', function (a, b) {
    if (!b) {
      b = ''
    }

    if (typeof a !== 'string') {
      a = JSON.stringify(a)
    }

    console.log(b, a.replace(/\s\s+/g, ' ').trim())
  })

  await page.exposeFunction('parseTitles', async (htmlAsString) => {
    const $ = cheerio.load((`${htmlAsString}`).replace(/(?:\r\n|\r|\n)/g, ''))
    const $eventTimes = $('.event-time')

    $eventTimes.each((i, el) => {
      console.log(cheerio.load(el).text().trim())
    })
  })

  await page.exposeFunction('parseDataFromHtml', function (htmlAsString) {
    const $ = cheerio.load(`<div>${htmlAsString}</div>`)
    const $eventData = $('.dataset-value')
    const result = [[], []]
    const eventDataLength = $eventData.length
    const halfLen = eventDataLength / 2

    $eventData.each((i, el) => {
      if (i < halfLen) {
        result[0].push(cheerio.load(el).text().trim())
      } else {
        result[1].push(cheerio.load(el).text().trim())
      }
    })

    return Promise.resolve(result)
  })

  await page.exposeFunction('saveToDb', async (queryNumber, set1, set2) => {
    try {
      await DataSet.create({
        queryNumber,
        set1,
        set2
      })
      console.log('\x1b[32m%s\x1b[0m', 'Сохранено в БД.')
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', `Не удалось сохранить в БД: ${err.message || err.msg}`)
    }
  })

  // DataSet.watch().on('change', () => {
  //   console.log('DataSet changed!')
  // })
  await tryToParse(page, observableSelector)
})()
