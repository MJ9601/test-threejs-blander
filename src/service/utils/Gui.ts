import * as dat from "dat.gui";
import Service from "../Service";

export default class Gui {
  Gui: dat.GUI;
  service: Service;

  constructor() {
    this.Gui = new dat.GUI();
    this.service = new Service();

    this.Gui.add(this.service.environment!.lamp1!.position, "z", -10, 10, 0.01);
    this.Gui.add(this.service.environment!.lamp1!.position, "x", -10, 10, 0.01);
    this.Gui.add(this.service.environment!.lamp1!.position, "y", -10, 10, 0.01);
  }
}
