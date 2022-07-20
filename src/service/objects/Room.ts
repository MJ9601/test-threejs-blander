import { get, extend, extendWith } from "lodash";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Service from "../Service";

export default class Room {
  service: Service;
  scene: Service["scene"];
  resources: Service["resources"];
  assets: Service["assets"];
  room?: GLTF["scene"];

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;
    this.resources = this.service.resources;
    this.assets = this.service.assets;

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
    const roomsName = this.assets?.glbFiles[0].name!;
    const roomData = await get(this.resources?.items!, roomsName);
    this.room = get(roomData, "scene");
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
      if (child.name === "aqu") {
        let material = get(child, "material") as THREE.MeshPhysicalMaterial;
        material = new THREE.MeshPhysicalMaterial();
        material.color.set(0x549dd2);
        material.ior = 3;
        material.transmission = 1;
        material.opacity = 1;
        material.roughness = 0;
        material.side = THREE.DoubleSide;
        // console.log(child.material)
        // @ts-ignore
        child.material = material;
        console.log(child);
      }

      if (lamps.find((name) => child.name == name)) console.log(child);
    });
  }

  createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materail = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, materail);

    this.scene?.add(cube);
  }
}
