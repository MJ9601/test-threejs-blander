import * as THREE from "three";
import Service from "./Service";

export default class Camera {
  service: Service;
  sizes: Service["sizes"];
  scene: Service["scene"];
  canvas: Service["canvas"];

  constructor() {
    this.service = new Service();
    this.sizes = this.service.sizes;
    this.scene = this.service.scene;
    this.canvas = this.service.canvas;
    console.log(this.canvas, this.sizes, this.scene);

    this.createPerspectiveCamera();
    this.createOrthoCamera();
  }

  createPerspectiveCamera() {
    
  }

  createOrthoCamera() {}
}
