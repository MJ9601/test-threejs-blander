export default class Size {
  aspect: number;
  pixelRatio: number;

  constructor() {
    this.aspect = innerWidth / innerHeight;

    this.pixelRatio = Math.min(devicePixelRatio, 2);

    addEventListener("resize", () => {
      this.aspect = innerWidth / innerHeight;
      this.pixelRatio = Math.min(devicePixelRatio, 2);
    });
  }
}
