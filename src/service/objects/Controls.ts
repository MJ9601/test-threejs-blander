import Service from "../Service";
import * as THREE from "three";
import gsap from "gsap";

export default class Controls {
  service: Service;
  scene: Service["scene"];
  resources: Service["resources"];
  time?: Service["time"];
  curve?: THREE.CatmullRomCurve3;
  sizes?: Service["sizes"];
  pathPrograss?: number;
  positionVector?: THREE.Vector3;
  lookAtVector?: THREE.Vector3;
  orthCamera?: THREE.OrthographicCamera;
  lerp: { current: number; target: number; ease: number } = {
    current: 0,
    target: 0,
    ease: 0.1,
  };
  paths?: {
    monitors: {
      position: THREE.Vector3[];
      rotation: THREE.Vector3[];
      frustrum: number;
    };
    tv: {
      position: THREE.Vector3[];
      rotation: THREE.Vector3[];
      frustrum: number;
    };
    laptop: {
      position: THREE.Vector3[];
      rotation: THREE.Vector3[];
      frustrum: number;
    };
    phone: {
      position: THREE.Vector3[];
      rotation: THREE.Vector3[];
      frustrum: number;
    };
    tablet: {
      position: THREE.Vector3[];
      rotation: THREE.Vector3[];
      frustrum: number;
    };
  };

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;
    this.resources = this.service.resources;
    this.time = this.service.time;
    this.orthCamera = this.service.camera?.orthCamera;

    this.paths = {
      monitors: {
        position: [
          new THREE.Vector3(-5, 0, 8),
          new THREE.Vector3(-2, 3, 5),
          new THREE.Vector3(1.93, 0.57, 1),
          new THREE.Vector3(1.93, 0.57, 0.53),
        ],
        rotation: [],
        frustrum: 0.6,
      },
      phone: {
        position: [
          new THREE.Vector3(-5, 0, 8),
          new THREE.Vector3(-2, 3, 5),
          new THREE.Vector3(2.6, 1.28, 0.29),
          new THREE.Vector3(2.6, 0.78, 0.29),
        ],
        rotation: [new THREE.Vector3(-1.57, 0, -1.79)],
        frustrum: 0.17,
      },
      laptop: {
        position: [
          new THREE.Vector3(-5, 0, 8),
          new THREE.Vector3(-2, 3, 5),
          new THREE.Vector3(2.27, 0.47, 0.82),
          new THREE.Vector3(2.77, 0.47, 0.82),
        ],
        frustrum: 0.18,
        rotation: [],
      },
      tablet: {
        position: [
          new THREE.Vector3(-5, 0, 8),
          new THREE.Vector3(-2, 3, 5),
          new THREE.Vector3(1.68, 0.86, 2.27),
          new THREE.Vector3(1.68, 0.16, 2.27),
        ],
        rotation: [new THREE.Vector3(-1.57, 0, -1.06)],
        frustrum: 0.17,
      },
      tv: {
        position: [
          new THREE.Vector3(-5, 0, 8),
          new THREE.Vector3(-2, 3, 5),
          new THREE.Vector3(1.14, 0.79, 2.55),
          new THREE.Vector3(2.48, 0.79, 2.55),
        ],
        frustrum: 0.76,
        rotation: [],
      },
    };

    this.pathPrograss = 0;
    this.positionVector = new THREE.Vector3(0, 0, 0);
    this.lookAtVector = new THREE.Vector3(0, 0, 0);
    this.setPath();
    this.onWheel();
  }

  async setPath() {
    this.curve = new THREE.CatmullRomCurve3(this.paths?.tablet.position!);

    console.log(this.paths);
    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const curveObject = new THREE.Line(geometry, material);
    this.scene?.add(curveObject);
  }

  onWheel() {
    addEventListener("wheel", (e: WheelEvent) => {
      if (e.deltaY > 0) this.lerp.target += 0.01;
      else this.lerp.target -= 0.01;
    });
  }

  update() {
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.lerp.current = gsap.utils.clamp(0, 1, this.lerp.current);
    this.lerp.target = gsap.utils.clamp(0, 1, this.lerp.target);

    this.lerp.target += 0.01;
    this.curve?.getPointAt(this.lerp.current, this.positionVector);
    this.curve?.getPointAt(this.lerp.current + 0.001, this.lookAtVector);
    // this.pathPrograss! -= 0.001;
    // if (this.pathPrograss! < 0) this.pathPrograss = 1;
    this.orthCamera?.position.copy(this.positionVector!);
    this.orthCamera?.lookAt(this.lookAtVector!);

    this.sizes?.update();
    // this.sizes!.frustrum! = this.paths?.laptop.frustrum!;
  }
}
