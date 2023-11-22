import { read, utils } from "xlsx";
import { Employee } from "./AppReducer";

const transformArrayToObjectArray = (data: any[][]) => {
  const headers = data[0] as (keyof Employee)[];

  const parsedColumns = data.slice(1).map((row) => {
    const employee: Partial<Employee> = {};
    headers.forEach((header, index) => {
      console.log(header === "CARGA_FAMILIAR");
      if (header === "CARGA_FAMILIAR") {
        employee[header as keyof Employee] = row[index]
          ? ([row[index]] as string[])
          : [];
      } else {
        employee[header as keyof Employee] = row[index] ? row[index] : null;
      }
    });

    return employee as Employee;
  });

  const parsedCharge = parsedColumns.reduce((accum, value) => {
    const key = value.NOMBRE_TRABAJADOR;
    if (Object.keys(accum).includes(key)) {
      console.log(accum[key].CARGA_FAMILIAR);
      accum[key] = {
        ...accum[key],
        CARGA_FAMILIAR: [...accum[key].CARGA_FAMILIAR, ...value.CARGA_FAMILIAR],
      };
    } else {
      accum[value.NOMBRE_TRABAJADOR] = value;
    }

    return accum;
  }, {} as { [key: string]: Employee });

  console.log(parsedCharge);
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

    const workbook = read(new Uint8Array(data), { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    const dataArray = utils.sheet_to_json(firstSheet, {
      header: 1,
    }) as any[][];

    return transformArrayToObjectArray(dataArray) as Employee[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
