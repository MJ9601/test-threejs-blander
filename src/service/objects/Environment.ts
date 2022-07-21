import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
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
  aquLamp?: THREE.RectAreaLight;

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;

    // this.createSunlight();
    this.createAmbientlight();
    this.createPointLight();
    this.addHelpers();
    // this.addGui();
    this.createRectAreaLight();
  }

  createPointLight() {
    this.lamp1 = new THREE.PointLight(0xffaa00, 1);
    // this.lamp1.position.set(0, 0, 0);
    this.scene?.add(this.lamp1);
    this.lamp1.position.set(2.99, 0.57, 0.43);
    this.lamp1.castShadow = true;
    // this.lamp1.shadow.camera.far = 20;
    // this.lamp1.shadow.mapSize.set(1024, 1024);
    this.lamp1.shadow.normalBias = 0.05;

    this.lamp2 = new THREE.PointLight(0xffaa00, 1);
    this.scene?.add(this.lamp2);
    this.lamp2.position.set(1.16, 0.57, -0.13);
    this.lamp2.castShadow = true;
    // this.lamp2.shadow.camera.far = 20;
    // this.lamp2.shadow.mapSize.set(1024, 1024);
    this.lamp2.shadow.normalBias = 0.05;

    this.lamp3 = new THREE.PointLight(0xffaa00, 1);
    this.scene?.add(this.lamp3);
    this.lamp3.position.set(2.58, 1.6, -0.15);
    this.lamp3.castShadow = true;
    // this.lamp3.shadow.camera.far = 20;
    // this.lamp3.shadow.mapSize.set(1024, 1024);
    this.lamp3.shadow.normalBias = 0.05;

    // const lamp1 = this.Gui?.Gui.addFolder("lamp1");
    // lamp1?.add(this.lamp1!.position, "z", -10, 10);
    // const lamp2 = this.Gui?.Gui.addFolder("lamp2");
    // lamp2?.add(this.lamp2!.position, "z", -10, 10);
  }

  createRectAreaLight() {
    RectAreaLightUniformsLib.init();
    const width = 0.85;
    const height = 0.47;
    this.aquLamp = new THREE.RectAreaLight(0xffffff, 6, width, height);
    this.aquLamp.position.set(0, 0.71, 0);
    this.aquLamp.lookAt(0, 2, 0);
    // this.aquLamp.lookAt(-1, 25, 10);
    this.scene?.add(this.aquLamp);
    const aquLampHelper = new RectAreaLightHelper(this.aquLamp!);
    this.scene?.add(aquLampHelper);
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
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
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

    // const lamp1Helper = new THREE.PointLightHelper(this.lamp1!, 0.1);
    // this.scene?.add(lamp1Helper);
  }

  addGui() {
    const lamp1 = this.Gui?.Gui.addFolder("lamp1");
    lamp1?.add(this.lamp1!.position, "z", -10, 10);
  }
}
