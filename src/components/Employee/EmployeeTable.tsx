import { Employee } from "../../actions/AppInterfaces";

/**
 * Table that shows the employees' information such as their ID number,
 * name, age, and profession
 * @param employees List of employees by area
 */
const EmployeeTable = ({ employees }: { employees: Employee[] }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Rut</th>
          <th scope="col">Edad</th>
          <th scope="col">Profesión</th>
          <th scope="col">Cargo</th>
          <th scope="col">Carga familiar</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          return (
            <tr>
              <td>{employee.NOMBRE_TRABAJADOR}</td>
              <td>{employee.RUT_TRABAJADOR}</td>
              <td>{employee.EDAD}</td>
              <td>{employee.PROFESION ? employee.PROFESION : "Sin trabajo"}</td>
              <td>{employee.CARGO}</td>
              <td>
                <ul>
                  {employee.CARGA_FAMILIAR.length > 0
                    ? employee.CARGA_FAMILIAR.map((charge) => <li>{charge}</li>)
                    : "No aplica"}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
