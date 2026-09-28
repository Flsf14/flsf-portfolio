"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

export function WorkFilter({ projects }: { projects: Project[] }) {
  const filters = ["Semua", ...Array.from(new Set(projects.flatMap((project) => project.disciplines))).sort()];
  const [active, setActive] = useState("Semua");
  const visible = useMemo(
    () => active === "Semua" ? projects : projects.filter((project) => project.disciplines.includes(active)),
    [active, projects],
  );

  return (
    <>
      <div className="filter-bar" aria-label="Filter karya">
        {filters.map((filter) => (
          <button key={filter} type="button" className={filter === active ? "active" : ""} onClick={() => setActive(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">{visible.length} project ditampilkan</p>
      <div className="project-list">
        {visible.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </>
  );
}
