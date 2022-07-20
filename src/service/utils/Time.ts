import { EventEmitter } from "events";

export default class Time extends EventEmitter {
  start: Date | number;
  current: Date | number;
  elapsed: number | Date;
  delta: number;

  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; //16milisconed

    this.animate();
  }

  animate() {
    const currentTime = Date.now();
    this.delta = currentTime - (this.current as number);
    this.current = currentTime;
    this.elapsed = this.current - (this.start as number);
    // console.log(this.current, this.elapsed);
    this.emit("update");

    requestAnimationFrame(() => this.animate());
  }
}
