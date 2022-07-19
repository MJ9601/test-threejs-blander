import * as THREE from "three";
import Service from "./Service";

export default class Renderer {
  service: Service;
  sizes: Service["sizes"];
  camera: Service["camera"];
  scene: Service["scene"];
  renderer?: THREE.WebGLRenderer;
  canvas: Service["canvas"];

  constructor() {
    this.service = new Service();
    this.sizes = this.service.sizes;
    this.camera = this.service.camera;
    this.scene = this.service.scene;
    this.canvas = this.service.canvas;

    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(this.sizes!.pixelRatio);
  }

  resize() {
    this.renderer!.setSize(innerWidth, innerHeight);
    this.renderer!.setPixelRatio(this.sizes!.pixelRatio);
  }

  update() {
    this.renderer!.render(this.scene!, this.camera?.perCamera!);
  }
}
