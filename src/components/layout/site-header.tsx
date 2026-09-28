"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/", "Home"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Afsun Filosof, beranda">
        <span>AFSUN</span>
        <span>FILOSOF</span>
      </Link>
      <span className="brand-role">Creative &amp;<br />Content Specialist</span>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Tutup" : "Menu"}
      </button>
      <nav id="primary-nav" className={open ? "nav nav-open" : "nav"} aria-label="Navigasi utama">
        {links.map(([href, label]) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={active ? "nav-link active" : "nav-link"} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
