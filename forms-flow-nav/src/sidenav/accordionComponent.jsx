import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import ChevronIcon from "./chevronicon.svg";
import { MULTITENANCY_ENABLED } from "../constants/constants";
import { useTranslation } from "react-i18next";

const AccordionComponent = ({ eventKey, header, links, }) => {
  const location = useLocation();
  const baseUrl = MULTITENANCY_ENABLED ? `/tenant/${tenantKey}/` : "/";
  const { t } = useTranslation();

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header data-testid={`accordion-header-${eventKey}`} aria-label={`Accordion header for ${header}`}>
        <img src={ChevronIcon} alt="Chevron icon" className="custom-chevron" />
        <span>{header}</span>
      </Accordion.Header>
      <Accordion.Body>
        {links.map((link, index) => (
          <Link
            key={index}
            to={`${baseUrl}${link.path}`}
            className={`accordion-link ${
              link.matchExp
                ? link.matchExp.test(location.pathname)
                  ? "active"
                  : ""
                : ""
            } `}
            data-testid={`accordion-link-${index}`}
            aria-label={`Link to ${link.name}`}
          >
            {link.name}
          </Link>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionComponent;
