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

  constructor() {
    this.service = new Service();
    this.scene = this.service.scene;
    this.resources = this.service.resources;
    this.assets = this.service.assets;

    // this.createCube();

    this.createRoom();
  }

  async createRoom() {
    const roomsName = this.assets?.glbFiles[0].name!;
    const roomData = await get(this.resources?.items!, roomsName);
    this.room = get(roomData, "scene");
    console.log(this.room);
    this.scene?.add(this.room!);
  }

  createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materail = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, materail);

    this.scene?.add(cube);
  }
}
