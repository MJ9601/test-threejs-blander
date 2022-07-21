import * as THREE from "three";
import Service from "../Service";

export default class Environment {
  service: Service;
  scene: Service["scene"];
  Gui?: Service["Gui"];
  sunLight?: THREE.DirectionalLight;
  ambientLight?: THREE.AmbientLight;
  lamp1?: THREE.PointLight;
  lamp2?: THREE.PointLight;
  lamp3?: THREE.PointLight;
  aquLamp?: THREE.Light;

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;

    // this.createSunlight();
    // this.createAmbientlight();
    this.createPointLight();
    this.addHelpers();
    // this.addGui();
  }

  createPointLight() {
    this.lamp1 = new THREE.PointLight(0xffaa00, 1);
    // this.lamp1.position.set(0, 0, 0);
    this.scene?.add(this.lamp1);
    this.lamp1.position.set(1.75, 0.6, -1.16);
    this.lamp1.castShadow = true;
    // this.lamp1.shadow.camera.far = 20;
    // this.lamp1.shadow.mapSize.set(1024, 1024);
    this.lamp1.shadow.normalBias = 0.05;

    this.lamp2 = new THREE.PointLight(0xffaa00, 1);
    this.scene?.add(this.lamp2);
    this.lamp2.position.set(-0.16, 0.51, -1.77);
    this.lamp2.castShadow = true;
    // this.lamp2.shadow.camera.far = 20;
    // this.lamp2.shadow.mapSize.set(1024, 1024);
    this.lamp2.shadow.normalBias = 0.05;

    this.lamp3 = new THREE.PointLight(0xffaa00, 1);
    this.scene?.add(this.lamp3);
    this.lamp3.position.set(1.19, 1.58, -1.59);
    this.lamp3.castShadow = true;
    // this.lamp3.shadow.camera.far = 20;
    // this.lamp3.shadow.mapSize.set(1024, 1024);
    this.lamp3.shadow.normalBias = 0.05;

    // const lamp1 = this.Gui?.Gui.addFolder("lamp1");
    // lamp1?.add(this.lamp1!.position, "z", -10, 10);
    // const lamp2 = this.Gui?.Gui.addFolder("lamp2");
    // lamp2?.add(this.lamp2!.position, "z", -10, 10);
  }

  createSunlight() {
    const sunlight = new THREE.DirectionalLight(0xffffff, 3);
    sunlight.castShadow = true;
    sunlight.shadow.camera.far = 20;
    sunlight.shadow.mapSize.set(2048, 2048);
    sunlight.shadow.normalBias = 0.05;
    sunlight.position.set(-1.5, 1.5, 2.5);
    this.sunLight = sunlight;
    this.scene?.add(sunlight);
  }

  createAmbientlight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene?.add(this.ambientLight);
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
    // const sunlightHelper = new THREE.DirectionalLightHelper(this.sunLight!);
    // this.scene?.add(sunlightHelper);

    const lamp1Helper = new THREE.PointLightHelper(this.lamp1!, 0.1);
    this.scene?.add(lamp1Helper);
  }

  addGui() {
    const lamp1 = this.Gui?.Gui.addFolder("lamp1");
    lamp1?.add(this.lamp1!.position, "z", -10, 10);
  }
}
