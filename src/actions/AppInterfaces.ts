export interface Employee {
  ID_EMPRESA: number;
  ID_AREA: string;
  RUT_TRABAJADOR: string;
  NOMBRE_TRABAJADOR: string;
  EDAD: number;
  PROFESION: string | null;
  CARGO: string;
  CARGA_FAMILIAR: string[];
}

export interface ParsedEmployee {
  companyId: number;
  areaId: string;
  identifierNumber: string;
  name: string;
  age: string;
  career: string | null;
  title: string;
  family: string[];
}

export enum ExcelToHeader {
  ID_EMPRESA = "companyId",
  ID_AREA = "areaId",
  RUT_TRABAJADOR = "identifierNumber",
  NOMBRE_TRABAJADOR = "name",
  EDAD = "age",
  PROFESION = "career",
  CARGO = "title",
  CARGA_FAMILIAR = "family",
}

export interface IAggregateEmployee {
  [key: string]: { [key: string]: ParsedEmployee[] };
}

/**
 * Application's interface that saves the important
 * data required for the application to work.
 */
export interface AppState {
  information: IAggregateEmployee;
  loading: boolean;
  companies: { [key: number]: ICompany };
}

/**
 * Interface that resembles the company information such as:
 * ID, Name, and areas.
 */
export interface ICompany {
  companyName: string;
  companyId: number;
  companyArea: {
    [key: string]: {
      areaId: string;
      areaName: string;
    };
  };
}
