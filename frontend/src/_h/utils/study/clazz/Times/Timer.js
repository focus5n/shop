
class IntervalTimer {
    constructor(interval = 10, callback = () => { }) {
        this.prevInterval = 0
        if (this.instance == null) {
            this.interval = interval
            this.callback = callback
            this.instance = this
        } else {
            return this.instance
        }
    }

    startTimer() {
        this.timer = setInterval(this.callback, this.interval)
    }

    resetTimer() {
        clearInterval(this.timer)
        this.callback = () => {}
        return this.getElapsedTime()
    }

    getElapsedTime(offset = 0) {
        this.timeElapsed = this.timer - this.prevInterval
        this.prevInterval = this.timer
        return this.timeElapsed - offset
    }

    getRunTime() {
        return this.timer
    }
}

const ExampleIntervalTimer = function (output = v => console.log(v)) {

    const timer = new IntervalTimer()
    timer.startTimer()
  
    const initOffset = timer.getRunTime()
  
    output(timer.getElapsedTime(initOffset))
  
    output(timer.resetTimer())
  }
  
  export { IntervalTimer, ExampleIntervalTimer }

  ExampleIntervalTimer()