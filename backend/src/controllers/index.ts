

import { BrandsController } from "./brands";
import { MediaController } from "./medias";
import { TenantsController } from "./tenants";
export function ControllerInit() {
  const controllers = [
    new MediaController(),
    new BrandsController(),
    new TenantsController(),
  ];
  const routers = controllers.map((controller) => controller.getRouter());
  return routers;
};

