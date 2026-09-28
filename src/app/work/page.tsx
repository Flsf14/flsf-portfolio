import type { Metadata } from "next";
import { WorkFilter } from "@/components/work-filter";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Work", description: "Arsip karya multidisiplin Afsun Filosof." };

export default function WorkPage() {
  return (
    <div className="page-shell work-page">
      <header className="page-intro">
        <h1>Work</h1>
        <p>Identitas, konten, editorial, video, dan pengalaman digital. Pilih disiplin atau telusuri semuanya sebagai satu arsip kerja.</p>
      </header>
      <WorkFilter projects={projects} />
    </div>
  );
}
