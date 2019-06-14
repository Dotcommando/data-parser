/**
 * Глобальная переменная, контролирует количество перезапросов страницы
 **/
export default app => {
  app.timeout = {
    set settings ({ interval, status }) {
      if (status === 'start') {
        this.interval = interval
        this.status = status
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.parsePage()
        }, this.interval)
        console.log(`New interval defined: ${interval}.`)
        console.log(`Watcher executing status: ${status}`)
      } else if (status === 'stop') {
        clearTimeout(this.timer)
        this.status = status
        console.log(`Watcher executing status: ${status}`)
      }
    },
    get settings () {
      return {
        interval: this.interval,
        status: this.status
      }
    },
    interval: 500,
    status: 'sleeping',
    timer: null,
    parsePage: function () {
      console.log('Request for page...')
      this.timer = setTimeout(() => {
        this.parsePage()
      }, this.interval)
    }
  }
}
