import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ClassCard from "./ClassCard";
import './classes.css';

const PAGE_SIZE = 6;

const ClassGroupsPaginated = ({ groups, allClasses }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupFromUrl = searchParams.get("group") || "all";

  const [activeGroup, setActiveGroup] = useState(groupFromUrl);
  const [page, setPage] = useState(1);

  // keep state in sync when URL changes (user clicks dropdown links)
  useEffect(() => {
    setActiveGroup(groupFromUrl);
    setPage(1);
  }, [groupFromUrl]);

  const filtered = useMemo(() => {
    if (activeGroup === "all") return allClasses;
    return allClasses.filter((c) => c.group === activeGroup);
  }, [activeGroup, allClasses]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const changeGroup = (key) => {
    setSearchParams(key === "all" ? {} : { group: key });
  };

  return (
    <div className="classesPager">
      {/* Group tabs */}
      <div className="groupTabs" data-aos="fade-up" data-aos-duration="900">
        <button
          className={`groupTab ${activeGroup === "all" ? "active" : ""}`}
          onClick={() => changeGroup("all")}
          type="button"
        >
          All
        </button>

        {groups.map((g) => (
          <button
            key={g.key}
            className={`groupTab ${activeGroup === g.key ? "active" : ""}`}
            onClick={() => changeGroup(g.key)}
            type="button"
          >
            {g.shortTitle || g.title}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="classesGrid" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
        {pageItems.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="paginationRow" data-aos="fade-up" data-aos-delay="160" data-aos-duration="900">
        <button
          type="button"
          className="pageBtn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ← Prev
        </button>

        <span className="pageInfo">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          className="pageBtn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ClassGroupsPaginated;
