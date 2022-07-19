import * as THREE from "three";
import Camera from "./Camera";
import Size from "./utils/Size";

const canvas = document.querySelector<HTMLCanvasElement>("#three")!;

export default class Service {
  static instance: Service;
  canvas?: HTMLCanvasElement;
  scene?: THREE.Scene;
  sizes?: Size;
  camera?: Camera;

  constructor() {
    if (Service.instance) return Service.instance;

    Service.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    console.log("hello");

    this.sizes = new Size();
    this.camera = new Camera();
  }
}
