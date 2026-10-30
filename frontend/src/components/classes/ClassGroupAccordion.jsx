import React, { useState } from "react";
import ClassCard from "./ClassCard";
import './classes.css';

const ClassGroupAccordion = ({ groups, allClasses }) => {
  const [open, setOpen] = useState(groups?.[0]?.key ?? null);

  return (
    <div className="classesAccordion">
      {groups.map((g) => {
        const isOpen = open === g.key;
        const panelId = `panel-${g.key}`;
        const btnId = `btn-${g.key}`;
        const items = allClasses.filter((c) => c.group === g.key);

        return (
          <div className="classesAccItem" key={g.key}>
            <button
              id={btnId}
              className={`classesAccBtn ${isOpen ? "open" : ""}`}
              onClick={() => setOpen(isOpen ? null : g.key)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              type="button"
            >
              <span>{g.title}</span>
              <i
                className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
                aria-hidden="true"
              ></i>
            </button>

            <div
              id={panelId}
              className={`classesAccPanel ${isOpen ? "open" : ""}`}
              role="region"
              aria-labelledby={btnId}
            >
              <div className="classesGrid">
                {items.map((item) => (
                  <ClassCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassGroupAccordion;
