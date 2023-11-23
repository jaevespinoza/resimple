import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../store/store";
import AreaAccordion from "../Area/AreaAccordion";

/**
 * Accordion component that shows the name of each company in the title,
 * as well as the information per area.
 */
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
              <AreaAccordion
                companyId={companyId}
                companies={companies}
                areas={areas}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyAccordion;
