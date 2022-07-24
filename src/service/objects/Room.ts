import { get } from "lodash";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Service from "../Service";

export default class Room {
  service: Service;
  scene: Service["scene"];
  resources: Service["resources"];
  assets: Service["assets"];
  room?: GLTF["scene"];
  roomData?: GLTF;
  mixer?: THREE.AnimationMixer;
  time?: Service["time"];

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;
    this.resources = this.service.resources;
    this.assets = this.service.assets;
    this.time = this.service.time;
    // this.createCube();

    this.createRoom();
  }

  async createRoom() {
    const lamps = [
      "lamp-1",
      "lamp-2",
      "lamp-3",
      "tv-inner-lamp",
      "aqu-inner-lamp",
      "aqu",
      "glass",
    ];

    const screens = [
      "screen-1",
      "screen-2",
      "phone-screen",
      "laptop-screen",
      "tv-screen",
      "tablet-screen",
    ];
    const roomsName = this.assets?.glbFiles[0].name!;
    this.roomData = await get(this.resources?.items!, roomsName);
    this.room = get(this.roomData, "scene");
    this.scene?.add(this.room!);
    // console.log(this.room);

    this.room?.scale.set(0.1, 0.1, 0.1);
    this.room?.position.set(0, -0.2, 0);

    this.room?.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Group)
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });

      // console.log(child);
      if (lamps.find((name) => child.name == name)) {
        this.setMaterialGlass(child as THREE.Mesh, 0x549dd2);

        // console.log(child.material)
        if (child instanceof THREE.Group) {
          child.children.forEach((groupChild) => {
            this.setMaterialGlass(groupChild as THREE.Mesh, 0x40e0d0);
          });
        }
        if (child instanceof THREE.Mesh) {
          this.setMaterialGlass(child, 0x549dd2);

          if (child.name !== "aqu") this.setMaterialGlass(child, 0xffaa00);

          // console.log(child);
        }
      }
      //  else if (screens.find((name) => child.name === name)) {
      //     // console.log(child);
      //     if (child.name == "tv-screen" || child.name == "phone-screen") {
      //       // @ts-ignore
      //       child.material = new THREE.MeshBasicMaterial({
      //         map: this.resources?.videos[0].videoTexture,
      //       });
      //     } else if (child.name == "screen-1" || child.name == "screen-2") {
      //       // @ts-ignore
      //       child.material = new THREE.MeshBasicMaterial({
      //         map: this.resources?.images[0].imgTexture,
      //       });
      //     }
      //   }
    });

    await this.setAnimations();
  }

  // set animations
  async setAnimations() {
    this.mixer = new THREE.AnimationMixer(this.room!);

    console.log(this.roomData);

    const swim1 = this.mixer.clipAction(this.roomData!.animations[0]);
    const swim2 = this.mixer.clipAction(this.roomData!.animations[2]);
    swim1.play();
    swim2.play();
    const rotate = this.mixer.clipAction(this.roomData!.animations[1]);
    rotate.play();
  }

  update() {
    this.mixer?.update(this.time?.delta! * 0.0009);
  }

  setMaterialGlass(child: THREE.Mesh, color: number) {
    const material = new THREE.MeshPhysicalMaterial();

    material.color.set(color);
    material.ior = 3;
    material.transmission = 1;
    material.opacity = 1;
    material.roughness = 0;
    material.side = THREE.DoubleSide;
    child.material = material;
  }

  setMaterialTexture(child: THREE.Mesh, texture: THREE.Texture) {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    child.material = material;
  }

  // createCube() {
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const materail = new THREE.MeshBasicMaterial({ color: 0xffffff });
  //   const cube = new THREE.Mesh(geometry, materail);

  //   this.scene?.add(cube);
  // }
}
