import { LoopCarousel } from "@/components/ui/loop-carousel";
import type { Project } from "@/lib/projects";

export function SelectedWorkCarousel({ projects }: { projects: Project[] }) {
  return <LoopCarousel mode="coverflow" label="Karya pilihan Afsun Filosof" slides={projects.map((project) => ({
    id: project.slug,
    title: project.title,
    image: project.image,
    alt: project.imageAlt,
    position: project.imagePosition,
    href: `/work/${project.slug}`,
    action: "Buka cerita proyek",
    description: project.summary,
    meta: `${project.client} · ${project.year}`,
    plate: project.image ? undefined : ["Editorial.", "Layout.", "Publikasi."],
  }))} />;
}
