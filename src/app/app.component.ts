import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logs = [];

  startTime;
  currentTime;
  offset = 0;

  timerActive = false;

  timer = 0;
  timerId;

  counter() {
    this.currentTime = new Date().getTime();
    this.timer = this.currentTime - this.startTime + this.offset;
    this.timerId = setTimeout(this.counter.bind(this), 100);
  }

  getTimeString() {
    let timeString = new Date(this.timer);

    let minutes = timeString.getMinutes();
    let seconds = timeString.getSeconds();
    let milliseconds = timeString.getMilliseconds();

    return minutes + ':' + seconds + '.' + milliseconds;
  }

  getTimeStringMinutes() {
    let timeString = new Date(this.timer);

    let minutes = timeString.getMinutes();
    return minutes;
  }

  getTimeStringSeconds() {
    let timeString = new Date(this.timer);

    let seconds = timeString.getSeconds();
    return seconds;
  }

  getTimeStringMilliseconds() {
    let timeString = new Date(this.timer);

    let milliseconds = timeString.getMilliseconds();
    return milliseconds;
  }


  onStart() {
    if (this.timerActive) return;
    this.timerActive = true;

    this.startTime = new Date().getTime();
    this.counter();
  }

  onPause() {
    if (!this.timerActive) return;
    this.timerActive = false;

    this.logs.push(this.getTimeString());

    this.offset = this.timer;
    clearTimeout(this.timerId);
    this.timerActive = false;
  }

  onReset() {
    if (this.timer == 0) return;
    
    if (this.timerActive) this.logs.push(this.getTimeString());

    this.timer = 0;
    this.offset = 0; 
    this.timerActive = false;
    clearTimeout(this.timerId);
  }

  onRemoveLog(element) {
    let index = this.logs.indexOf(element);
    if (index > -1) {
      this.logs.splice(index, 1);
    }
  }

}
