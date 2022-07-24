import Service from "../Service";
import Resouces from "../utils/Resources";
import Controls from "./Controls";
import Environment from "./Environment";
import Room from "./Room";

export default class World {
  service: Service;
  room?: Room;
  resources: Resouces;
  environment?: Environment;
  contorls?: Controls;

  constructor() {
    this.service = new Service();
    this.resources = new Resouces();

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
      this.contorls = new Controls();
    });
  }

  update() {
    this.room && this.room?.update();
    this.contorls && this.contorls?.update()
  }
}
