class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
    const d = new Date();
    this.hours = d.getHours();
    this.minutes = d.getMinutes();
    this.seconds = d.getSeconds();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.

    if (this.seconds < 59) {
      this.seconds ++;
    } else if (this.minutes < 59){
      this.seconds = 0;
      this.minutes++;
    } else {
      this.hours++;
      this.minutes = 0;
      this.seconds = 0;
    }

    this.printTime();
  }
}

const clock = new Clock();
