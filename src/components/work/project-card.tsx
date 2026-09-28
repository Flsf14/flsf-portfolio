import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className={project.image ? "project-card" : "project-card project-card-text"}>
      {project.image && (
        <Link href={`/work/${project.slug}`} className="project-image">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 93vw, 60vw" priority={priority} style={{ objectPosition: project.imagePosition ?? "center" }} />
        </Link>
      )}
      <div className="project-info">
        <p>{project.client} · {project.year}</p>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <p className="asset-status">{project.image ? "Cuplikan portfolio dari dokumen CV" : project.assetStatus}</p>
        <ul aria-label="Disiplin">
          {project.disciplines.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </article>
  );
}
