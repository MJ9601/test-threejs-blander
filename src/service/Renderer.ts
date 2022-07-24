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
    this.renderer?.setViewport(0, 0, innerWidth, innerHeight);
    this.renderer!.render(this.scene!, this.camera?.perCamera!);

    this.renderer?.setScissorTest(true);
    this.renderer?.setViewport(
      innerWidth / 3,
      innerHeight - innerHeight / 3,
      innerWidth / 3,
      innerHeight / 3
    );
    this.renderer?.setScissor(
      innerWidth / 3,
      innerHeight - innerHeight / 3,
      innerWidth / 3,
      innerHeight / 3
    );
    this.renderer?.render(this.scene!, this.camera?.orthCamera!);
    this.renderer?.setScissorTest(false);
  }
}
