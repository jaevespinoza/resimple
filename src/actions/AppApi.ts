import { read, utils } from "xlsx";
import {
  parseAreasPerCompany,
  parseCompanies,
  parseFamilyCharge,
  transformToObject,
} from "../../utils/transformExcel";

/**
 * Function that parses the entire object obtained through xlsx
 * @param data Data obtained by the fetch call
 */
const transformArrayToObjectArray = (data: string[][]) => {
  const employees = transformToObject(data);
  const employeesWithCharge = parseFamilyCharge(employees);
  const companiesWithEmployees = parseCompanies(employeesWithCharge);
  return parseAreasPerCompany(companiesWithEmployees);
};

/**
 * Async fetch call that gets the data from the excel and process it so
 * that it can be used in the application
 */
export const fetchData = async () => {
  try {
    const response = await fetch(
      "http://localhost:5173/origen-datos-senior.xlsx"
    );
    const data = await response.arrayBuffer();

    // We read the excel and find the first sheet
    const workbook = read(new Uint8Array(data), { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // We transform the sheet into a list of list of strings
    const dataArray = utils.sheet_to_json(firstSheet, {
      header: 1,
    }) as string[][];

    return transformArrayToObjectArray(dataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
