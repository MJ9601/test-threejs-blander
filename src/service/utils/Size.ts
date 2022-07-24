import { EventEmitter } from "events";
import Controls from "../objects/Controls";

export default class Size extends EventEmitter {
  aspect: number;
  pixelRatio: number;
  frustrum?: number;
  controls?: Controls;

  constructor() {
    super();
    this.aspect = innerWidth / innerHeight;

    this.pixelRatio = Math.min(devicePixelRatio, 2);

    this.frustrum = this.controls?.paths?.monitors.frustrum! || 0.6;

    addEventListener("resize", () => {
      this.aspect = innerWidth / innerHeight;
      this.pixelRatio = Math.min(devicePixelRatio, 2);
      this.emit("resize");
    });
  }

  update() {
    this.frustrum = this.controls?.paths?.monitors.frustrum;
  }
}
