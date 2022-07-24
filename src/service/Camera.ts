import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { threadId } from "worker_threads";
import Service from "./Service";

export default class Camera {
  service: Service;
  sizes: Service["sizes"];
  scene: Service["scene"];
  canvas: Service["canvas"];
  orthCamera?: THREE.OrthographicCamera;
  perCamera?: THREE.PerspectiveCamera;
  controls?: OrbitControls;
  orthHelper?: THREE.CameraHelper;

  constructor() {
    this.service = new Service();
    this.sizes = this.service.sizes;
    this.scene = this.service.scene;
    this.canvas = this.service.canvas;
    console.log(this.canvas, this.sizes, this.scene);

    this.createPerspectiveCamera();
    this.createOrthoCamera();
    this.setOrbitControl();
  }

  setOrbitControl() {
    this.controls = new OrbitControls(this.perCamera!, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  createPerspectiveCamera() {
    this.perCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes?.aspect,
      0.1,
      1000
    );
    this.scene?.add(this.perCamera);
    this.perCamera.position.set(-6, 6, 6.5);
  }

  createOrthoCamera() {
    this.orthCamera = new THREE.OrthographicCamera(
      (-this.sizes?.aspect! * this.sizes?.frustrum!) / 2,
      (this.sizes?.aspect! * this.sizes?.frustrum!) / 2,
      this.sizes?.frustrum! / 2,
      -this.sizes?.frustrum! / 2,
      -15,
      15
    );
    this.scene?.add(this.orthCamera);
    this.orthHelper = new THREE.CameraHelper(this.orthCamera);
    this.scene?.add(this.orthHelper);
  }
  resize() {
    this.perCamera!.aspect = this.sizes?.aspect as number;
    this.perCamera?.updateProjectionMatrix();

    this.orthCamera!.left = (-this.sizes?.aspect! * this.sizes?.frustrum!) / 2;
    this.orthCamera!.right = (this.sizes?.aspect! * this.sizes?.frustrum!) / 2;
    this.orthCamera!.top = this.sizes?.frustrum! / 2;
    this.orthCamera!.bottom = -this.sizes?.frustrum! / 2;
    this.orthCamera?.updateProjectionMatrix();
  }

  update() {
    this.controls?.update();
    this.orthHelper!.matrixWorldNeedsUpdate = true;
    this.orthHelper?.update();
    this.orthHelper?.position.copy(this.orthCamera?.position!);
    this.orthHelper?.rotation.copy(this.orthCamera?.rotation!);
  }
}
