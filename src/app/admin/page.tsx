import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import { projects } from "@/data/projects";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const configured = isSupabaseConfigured();
  return (
    <div className="admin-shell">
      <header><div><p>Portfolio CMS</p><h1>Project workspace</h1></div><Link href="/">Lihat website</Link></header>
      {!configured && (
        <div className="config-notice" role="status">
          <h2>Mode data lokal</h2>
          <p>Supabase belum dihubungkan. Project di bawah berasal dari data awal dan belum dapat diedit melalui dashboard. Ikuti README untuk mengaktifkan Auth, database, Storage, dan CRUD.</p>
        </div>
      )}
      <section className="admin-stats">
        <div><strong>{projects.length}</strong><span>Total project</span></div>
        <div><strong>{projects.filter((item) => item.featured).length}</strong><span>Featured</span></div>
        <div><strong>{configured ? "Aktif" : "Belum"}</strong><span>Database</span></div>
      </section>
      <section className="admin-projects">
        <div className="admin-heading"><h2>Project</h2><button type="button" disabled={!configured}>Tambah project</button></div>
        <div className="admin-table" role="table" aria-label="Daftar project">
          {projects.map((project) => (
            <div role="row" key={project.slug}>
              <div role="cell"><strong>{project.title}</strong><span>{project.client}</span></div>
              <div role="cell">{project.year}</div>
              <div role="cell">{project.featured ? "Featured" : "Published"}</div>
              <div role="cell"><Link href={`/work/${project.slug}`}>Buka</Link></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
