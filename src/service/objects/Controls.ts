import Service from "../Service";
import World from "./World";
import * as THREE from "three";

export default class Controls {
  service: Service;
  scene: Service["scene"];
  resources: Service["resources"];
  time?: Service["time"];
  curve?: THREE.CatmullRomCurve3;

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;
    this.resources = this.service.resources;
    this.time = this.service.time;

    this.setPath();
  }

  async setPath() {
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7, 0, 7),
      new THREE.Vector3(-4, 3, 4),
      new THREE.Vector3(-1, 0, 1),
      new THREE.Vector3(4, -3, 4),
      new THREE.Vector3(7, -0, 7),
    ]);

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const curveObject = new THREE.Line(geometry, material);
    this.scene?.add(curveObject);
  }

  update() {}
}
