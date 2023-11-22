import data from "../dicionario-de-datos.json";

/**
 * Function that will process the data obtained by Json and
 * will parse it so that it's easier to access when we use it
 */
const processDataJson = () => {
  return data.EMPRESAS.reduce((acc, company) => {
    acc[company.ID_EMPRESA] = {
      ID_EMPRESA: company.ID_EMPRESA,
      NOMBRE_EMPRESA: company.NOMBRE_EMPRESA,
      AREAS: company.AREAS.reduce((areasAcc, area) => {
        areasAcc[area.ID_AREA] = {
          ID_AREA: area.ID_AREA,
          NOMBRE_AREA: area.NOMBRE_AREA,
        };
        return areasAcc;
      }, {}),
    };
    return acc;
  }, {});
};

export default processDataJson;
