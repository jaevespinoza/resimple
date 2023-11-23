import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../store/store";

const CompanyAccordion = () => {
  const information = useSelector((state: RootState) => state.app.information);
  const companies = useSelector((state: RootState) => state.app.companies);
  const [expanded, setExpanded] = useState([] as string[]);

  const onClickAccordion = (value: string) => {
    if (expanded.includes(value))
      setExpanded(expanded.filter((companyId) => !(value === companyId)));
    else setExpanded([...expanded, value]);
  };

  return !information ? (
    <></>
  ) : (
    <div className="accordion" id="accordionExample">
      {Object.entries(information).map(([companyId, areas]) => {
        const isValueInExpanded = expanded.includes(companyId);
        return (
          <div className="accordion-item" key={companyId}>
            <h2 className="accordion-header" id={`heading-${companyId}`}>
              <button
                className="accordion-button"
                type="button"
                onClick={() => onClickAccordion(companyId)}
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${companyId}`}
                aria-expanded="false"
                aria-controls={`collapse-${companyId}`}
              >
                {companies[Number(companyId)].companyName}
              </button>
            </h2>
            <div
              id={`collapse-${companyId}`}
              className={`accordion-collapse collapse ${
                isValueInExpanded ? "show" : ""
              }`}
              aria-labelledby={`heading-${companyId}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="accordion" id={`accordion-${companyId}`}>
                  {Object.entries(areas).map(([areaId, employees]) => {
                    const itemKey = `${companyId}-${areaId}`;
                    const isAreaInExpanded = expanded.includes(itemKey);
                    return (
                      <div className="accordion-item" key={areaId}>
                        <h2
                          className="accordion-header"
                          id={`heading-${itemKey}`}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            onClick={() => onClickAccordion(`${itemKey}`)}
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${itemKey}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${itemKey}`}
                          >
                            {
                              companies[Number(companyId)].companyArea[areaId]
                                .areaName
                            }
                          </button>
                        </h2>
                        <div
                          id={`collapse-${itemKey}`}
                          className={`accordion-collapse collapse ${
                            isAreaInExpanded ? "show" : ""
                          }`}
                          aria-labelledby={`heading-${itemKey}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
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
                                      <td>{employee.PROFESION}</td>
                                      <td>{employee.CARGO}</td>
                                      <td>
                                        <ul>
                                          {employee.CARGA_FAMILIAR.length > 0
                                            ? employee.CARGA_FAMILIAR.map(
                                                (charge) => <li>{charge}</li>
                                              )
                                            : "No aplica"}
                                        </ul>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyAccordion;
