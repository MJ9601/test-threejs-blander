import * as THREE from "three";
import Camera from "./Camera";
import World from "./objects/World";
import Renderer from "./Renderer";
import Size from "./utils/Size";
import Time from "./utils/Time";
import assets, { Assets } from "./utils/assets";
import Resouces from "./utils/Resources";

const canvas = document.querySelector<HTMLCanvasElement>("#three")!;

export default class Service {
  static instance: Service;
  canvas?: HTMLCanvasElement;
  scene?: THREE.Scene;
  sizes?: Size;
  camera?: Camera;
  renderer?: Renderer;
  time?: Time;
  world?: World;
  assets?: Assets;
  resources?: Resouces;

  constructor() {
    if (Service.instance) return Service.instance;

    Service.instance = this;
    this.canvas = canvas;
    this.assets = assets;

    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Size();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resouces();

    this.world = new World();

    this.time.on("update", () => {
      this.update();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  update() {
    this.camera!.update();
    this.renderer!.update();
  }

  resize() {
    this.renderer?.resize();
    this.camera?.resize();
  }
}
