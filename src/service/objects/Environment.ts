import * as THREE from "three";
import Service from "../Service";

export default class Environment {
  service: Service;
  scene: Service["scene"];
  sunLight?: THREE.DirectionalLight;

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;

    this.createSunlight();
    this.addHelpers();
  }

  createSunlight() {
    const sunlight = new THREE.DirectionalLight(0xffffff, 3);
    sunlight.castShadow = true;
    sunlight.shadow.camera.far = 20;
    sunlight.shadow.mapSize.set(1024, 1024);
    sunlight.shadow.normalBias = 0.05;
    sunlight.position.set(-15, 15, 25);
    this.sunLight = sunlight;
    this.scene?.add(sunlight);
  }

  addHelpers() {
    // grid helper
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene?.add(gridHelper);

    // axis helper
    const axesHelper = new THREE.AxesHelper(10);
    this.scene?.add(axesHelper);

    // lights helper
    const sunlightHelper = new THREE.DirectionalLightHelper(this.sunLight!);
    this.scene?.add(sunlightHelper);
  }
}
