import { EventEmitter } from "events";

export default class Size extends EventEmitter {
  aspect: number;
  pixelRatio: number;
  frustrum?: number;

  constructor() {
    super();
    this.aspect = innerWidth / innerHeight;
    this.frustrum = 5;

    this.pixelRatio = Math.min(devicePixelRatio, 2);

    addEventListener("resize", () => {
      this.aspect = innerWidth / innerHeight;
      this.pixelRatio = Math.min(devicePixelRatio, 2);
      this.emit("resize");
    });
  }
}
