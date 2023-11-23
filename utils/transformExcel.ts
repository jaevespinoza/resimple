import {
  Employee,
  ExcelToHeader,
  IAggregateEmployee,
  ParsedEmployee,
} from "../src/actions/AppInterfaces";

/**
 * Function required to parse the object obtained by xlsx library
 * into an array of Employee objects
 * @param data Data obtained through the xlsx library
 * @returns Parsed json array of employees
 */
export const transformToObject = (data: string[][]) => {
  const headers = data[0] as (keyof Employee)[];

  // We map through the data and create json objects that we then
  // add to an array
  return data.slice(1).map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const employee: any = {};
    headers.forEach((header, index) => {
      const result = row[index];
      // If the header is CARGA_FAMILIAR, we have to make an array for
      // the next data processing
      if (header === "CARGA_FAMILIAR") {
        employee[ExcelToHeader[header]] = row[index]
          ? ([row[index]] as string[])
          : [];
      } else {
        employee[ExcelToHeader[header]] = result || "";
      }
    });

    return employee as ParsedEmployee;
  });
};

/**
 * Function that aggregates the family charges for each employee.
 * It takes the repeated rows and bundles them into one, with an array
 * of all the employee's family
 * @param employees Array of employee json objects
 * @returns Json Employee object with aggregated family charges
 */
export const parseFamilyCharge = (employees: ParsedEmployee[]) => {
  return employees.reduce((accum, value) => {
    const key = value.name;
    if (Object.keys(accum).includes(key)) {
      accum[key] = {
        ...accum[key],
        family: [...accum[key].family, ...value.family],
      };
    } else {
      accum[key] = value;
    }

    return accum;
  }, {} as { [key: string]: ParsedEmployee });
};

/**
 * Function that transforms the array of json employee objects into
 * an object that groups the employees by companies.
 * @param employees Json Employee object
 * @returns Json company object with its grouped employees
 */
export const parseCompanies = (employees: {
  [key: string]: ParsedEmployee;
}) => {
  return Object.keys(employees).reduce((accum, value) => {
    const employee = employees[value];
    const companyKey = employee.companyId;
    // We group the employees by company. If one already exists in the
    // accumulative object, we add the employee to its list.
    if (Object.keys(accum).includes(companyKey.toLocaleString())) {
      accum[companyKey] = [...accum[companyKey], employee];
    } else {
      accum[companyKey] = [employee];
    }

    return accum;
  }, {} as { [key: string]: ParsedEmployee[] });
};

/**
 * Function that groups the employees of each company by their area.
 * @param companies Json company object
 * @returns JSon company object with its grouped areas.
 */
export const parseAreasPerCompany = (companies: {
  [key: string]: ParsedEmployee[];
}) => {
  return Object.keys(companies).reduce((accum, companyId) => {
    const employeeByCompany = companies[companyId];
    // We reduce the employees and group them by area.
    // If one area already exists, we append the employee to its area.
    const aggregateByArea = employeeByCompany.reduce(
      (accumArea, employee) => {
        const areaId = employee.areaId;
        if (Object.keys(accumArea).includes(areaId)) {
          accumArea[areaId] = [...accumArea[areaId], employee];
        } else {
          accumArea[areaId] = [employee];
        }

        return accumArea;
      },

      {} as { [key: string]: ParsedEmployee[] }
    );

    accum[companyId] = aggregateByArea;
    return accum;
  }, {} as IAggregateEmployee);
};
