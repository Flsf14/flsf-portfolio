import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : { title: "Project tidak ditemukan" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="project-page public-page">
      <header className="project-hero section-shell">
        <Link className="back-link" href="/work">← Kembali ke Work</Link>
        <p>{project.client} · {project.year}</p>
        <h1>{project.title}</h1>
        <p className="project-lead">{project.summary}</p>
      </header>
      {project.image ? (
        <div className="project-cover">
          <Image src={project.image} alt={project.imageAlt} fill priority sizes="100vw" />
          <p className="cover-status">{project.assetStatus}</p>
        </div>
      ) : (
        <p className="project-media-note section-shell">{project.assetStatus}</p>
      )}
      <div className="case-study section-shell">
        <section><h2>Tantangan</h2><p>{project.challenge}</p></section>
        <section><h2>Pendekatan</h2><p>{project.approach}</p></section>
        <section><h2>Hasil</h2><p>{project.outcome}</p></section>
        <aside>
          <p>Disiplin</p>
          <ul>{project.disciplines.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>Format</p>
          <ul>{project.formats.map((item) => <li key={item}>{item}</li>)}</ul>
        </aside>
      </div>
      <section className="project-next section-shell">
        <h2>Butuh pendekatan serupa untuk proyek Anda?</h2>
        <Link className="button-primary" href="/contact">Ceritakan kebutuhannya</Link>
      </section>
    </article>
  );
}
