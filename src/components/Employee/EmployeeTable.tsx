import { ParsedEmployee } from "../../actions/AppInterfaces";

/**
 * Table that shows the employees' information such as their ID number,
 * name, age, and profession
 * @param employees List of employees by area
 */
const EmployeeTable = ({ employees }: { employees: ParsedEmployee[] }) => {
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
              <td>{employee.name}</td>
              <td>{employee.identifierNumber}</td>
              <td>{employee.age}</td>
              <td>{employee.career ? employee.career : "Sin trabajo"}</td>
              <td>{employee.title}</td>
              <td>
                <ul>
                  {employee.family.length > 0
                    ? employee.family.map((charge) => <li>{charge}</li>)
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
