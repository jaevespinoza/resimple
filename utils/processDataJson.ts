import data from "../dicionario-de-datos.json";
import { ICompany } from "../src/actions/AppInterfaces";

/**
 * Function that will process the data obtained by Json and
 * will parse it so that it's easier to access when we use it
 */
const processDataJson = () => {
  return data.EMPRESAS.reduce((acc, company) => {
    acc[company.ID_EMPRESA] = {
      companyId: company.ID_EMPRESA,
      companyName: company.NOMBRE_EMPRESA,
      companyArea: company.AREAS.reduce((areasAcc, area) => {
        areasAcc[area.ID_AREA] = {
          areaId: area.ID_AREA,
          areaName: area.NOMBRE_AREA,
        };
        return areasAcc;
      }, {} as { [key: string]: { areaId: string; areaName: string } }),
    };
    return acc;
  }, {} as { [key: number]: ICompany });
};

export default processDataJson;
