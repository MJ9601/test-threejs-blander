import Service from "../Service";
import Resouces from "../utils/Resources";
import Environment from "./Environment";
import Room from "./Room";

export default class World {
  service: Service;
  room?: Room;
  resources: Resouces;
  environment?: Environment;

  constructor() {
    this.service = new Service();
    this.resources = new Resouces();

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
    });
  }
}
