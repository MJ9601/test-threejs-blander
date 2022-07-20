import { EventEmitter } from "events";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

import Service from "../Service";
import { Assets } from "./assets";

export default class Resouces extends EventEmitter {
  service: Service;
  assets: Assets;
  renderer: Service["renderer"];
  items: {} | undefined;
  loadedCount: number = 0;
  loaders: { glftLoader: GLTFLoader; dracoLoader: DRACOLoader } = {
    glftLoader: new GLTFLoader(),
    dracoLoader: new DRACOLoader(),
  };
  videos: {
    name: string;
    videoElement: HTMLVideoElement;
    videoTexture: THREE.VideoTexture;
  }[] = [];
  images: {
    name: string;
    imgElement: HTMLImageElement;
    imgTexture: THREE.Texture;
  }[] = [];

  constructor() {
    super();
    this.service = new Service();
    this.renderer = this.service.renderer;
    this.assets = this.service.assets!;

    this.setLoaders();
    this.startLoadingProcess();
  }

  setLoaders() {
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.glftLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoadingProcess() {
    Object.keys(this.assets).forEach(async (type, index) => {
      if (type === "glbFiles") {
        this.items = await this.assets.glbFiles.reduce(async (pre, cur) => {
          const File = await this.loaders.glftLoader.loadAsync(cur.path);
          return { ...pre, [cur.name]: File };
        }, {});
      } else if (type == "videos") {
        this.videos = this.assets.videos.map(({ name, path }) => {
          const videoElement = document.createElement("video");
          videoElement.src = path;
          videoElement.playsInline = true;
          videoElement.muted = true;
          videoElement.loop = true;
          videoElement.autoplay = true;
          videoElement.play();

          const videoTexture = new THREE.VideoTexture(videoElement);
          videoTexture.flipY = false;
          videoTexture.generateMipmaps = false;
          videoTexture.minFilter = THREE.NearestFilter;
          videoTexture.magFilter = THREE.NearestFilter;
          videoTexture.encoding = THREE.sRGBEncoding;

          return { name, videoElement, videoTexture };
        });
      } else if (type == "images") {
        this.images = this.assets.images.map(({ name, path }) => {
          const imgElement = document.createElement("img");
          imgElement.src = path;

          const imgTexture = new THREE.Texture(imgElement);
          imgTexture.flipY = false;
          imgTexture.generateMipmaps = false;
          imgTexture.minFilter = THREE.NearestFilter;
          imgTexture.magFilter = THREE.NearestFilter;
          imgTexture.encoding = THREE.sRGBEncoding;

          return { name, imgElement, imgTexture };
        });
      }
      if (index == this.assets.glbFiles.length - 1) {
        // console.log({
        //   images: this.images,
        //   videos: this.videos,
        //   items: this.items,
        // });
        this.emit("ready");
      }
    });
  }
}
