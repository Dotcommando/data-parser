/**
 * Функция задержки исполнения.
 * @param milliseconds
 * @returns {Promise<any>}
 */
export const delay = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Генерирует случайное целое в заданном диапазоне.
 * @param min
 * @param max
 * @returns {number}
 */
export function randomInteger (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)

  return Math.round(rand)
}
