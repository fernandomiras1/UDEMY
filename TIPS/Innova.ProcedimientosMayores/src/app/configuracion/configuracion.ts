import { AdministradorConfiguracionService } from "tips.comun";

export function setConfig(urlInit,config){
}

export function ConfigLoader(configService: AdministradorConfiguracionService) {
  return () => configService.load(setConfig);
}

