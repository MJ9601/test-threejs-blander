import * as THREE from "three";
import Service from "./Service";

export default class Camera {
  service: Service;
  sizes: Service["sizes"];
  scene: Service["scene"];
  canvas: Service["canvas"];
  orthCamera?: THREE.OrthographicCamera;
  frustrum?: number;
  perCamera?: THREE.PerspectiveCamera;

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
    this.perCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes?.aspect,
      0.1,
      1000
    );
    this.scene?.add(this.perCamera);
  }

  createOrthoCamera() {
    this.frustrum = 5;
    this.orthCamera = new THREE.OrthographicCamera(
      (-this.sizes?.aspect! * this.frustrum) / 2,
      (this.sizes?.aspect! * this.frustrum) / 2,
      this.frustrum / 2,
      -this.frustrum / 2,
      -100,
      100
    );
    this.scene?.add(this.orthCamera);
  }
  resize() {
    this.perCamera!.aspect = this.sizes?.aspect as number;
    this.perCamera?.updateProjectionMatrix();

    this.orthCamera!.left = (-this.sizes?.aspect! * this.frustrum!) / 2;
    this.orthCamera!.right = (this.sizes?.aspect! * this.frustrum!) / 2;
    this.orthCamera!.top = this.frustrum! / 2;
    this.orthCamera!.bottom = -this.frustrum! / 2;
    this.orthCamera?.updateProjectionMatrix();
  }

  update() {}
}
