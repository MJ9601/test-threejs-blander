import * as dat from "dat.gui";
import Service from "../Service";

export default class Gui {
  Gui: dat.GUI;
  service: Service;
  camera: Service["camera"];

  constructor() {
    this.Gui = new dat.GUI();
    this.service = new Service();
    this.camera = this.service.camera;

    this.Gui.add(this.service.environment!.lamp1!.position, "x", -10, 10, 0.01);
    this.Gui.add(this.service.environment!.lamp1!.position, "y", -10, 10, 0.01);
    this.Gui.add(this.service.environment!.lamp1!.position, "z", -10, 10, 0.01);

    const camera = this.Gui.addFolder("OrthCamera");

    camera.add(this.camera?.orthCamera?.position!, "x", -10, 10, 0.01);
    camera.add(this.camera?.orthCamera?.position!, "y", -10, 10, 0.01);
    camera.add(this.camera?.orthCamera?.position!, "z", -10, 10, 0.01);
    camera.add(this.service.sizes!, "frustrum", 0, 5, 0.01);
    camera.add(
      this.camera?.orthCamera?.rotation!,
      "x",
      -Math.PI,
      Math.PI,
      0.01
    );
    camera.add(
      this.camera?.orthCamera?.rotation!,
      "y",
      -Math.PI,
      Math.PI,
      0.01
    );
    camera.add(
      this.camera?.orthCamera?.rotation!,
      "z",
      -Math.PI,
      Math.PI,
      0.01
    );
  }
}
