import { useState } from "react";
import { ICompany, ParsedEmployee } from "../../actions/AppInterfaces";
import EmployeeTable from "../Employee/EmployeeTable";
import "./styles.scss";

/**
 * Accordion component that shows information by area of each company
 * @param areas List of areas for the company
 * @param companyId Id of corresponding area
 * @param companies JSON containing the companies' information
 */
const AreaAccordion = ({
  areas,
  companyId,
  companies,
}: {
  areas: { [key: string]: ParsedEmployee[] };
  companyId: string;
  companies: { [key: number]: ICompany };
}) => {
  const [expanded, setExpanded] = useState([] as string[]);

  const onClickAccordion = (value: string) => {
    if (expanded.includes(value))
      setExpanded(expanded.filter((companyId) => !(value === companyId)));
    else setExpanded([...expanded, value]);
  };

  return (
    <div className="accordion-body">
      <div className="accordion" id={`accordion-${companyId}`}>
        {Object.entries(areas).map(([areaId, employees]) => {
          const itemKey = `${companyId}-${areaId}`;
          const isAreaInExpanded = expanded.includes(itemKey);
          return (
            <div className="accordion-item" key={areaId}>
              <h2 className="accordion-header" id={`heading-${itemKey}`}>
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => onClickAccordion(`${itemKey}`)}
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${itemKey}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${itemKey}`}
                >
                  {companies[Number(companyId)].companyArea[areaId].areaName}
                </button>
              </h2>
              <div
                id={`collapse-${itemKey}`}
                className={`accordion-collapse collapse ${
                  isAreaInExpanded ? "show" : ""
                }`}
                aria-labelledby={`heading-${itemKey}`}
                data-bs-parent={`#accordion-${companyId}`}
              >
                <div className="accordion-body area-accordion__body">
                  <EmployeeTable employees={employees} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaAccordion;
