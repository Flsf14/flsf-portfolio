import Image from "next/image";
import { shelters } from "@/data/shelters";
import "./shelter-logos.css";

function ShelterRow({ items, reverse = false }: {
  items: typeof shelters;
  reverse?: boolean;
}) {
  const renderGroup = (copy: boolean) => (
    <ul className="shelter-marquee-group" aria-hidden={copy || undefined}>
      {items.map((shelter) => (
        <li className="shelter-tile" key={`${shelter.id}-${copy ? "copy" : "original"}`}>
          {shelter.logo && <Image className="shelter-logo" src={shelter.logo} alt="" width={112} height={72} />}
          <span className="shelter-mark">{shelter.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`shelter-marquee${reverse ? " shelter-marquee-reverse" : ""}`}>
      <div className="shelter-marquee-track">
        {renderGroup(false)}
        {renderGroup(true)}
      </div>
    </div>
  );
}

export function ShelterLogos() {
  const midpoint = Math.ceil(shelters.length / 2);
  const firstRow = shelters.slice(0, midpoint);
  const secondRow = shelters.slice(midpoint);

  return (
    <section className="shelters section-shell" aria-labelledby="shelters-title">
      <div className="section-heading">
        <h2 id="shelters-title">Bagian dari perjalanan saya.</h2>
        <div className="shelters-intro">
          <p>Brand, kampus, dan organisasi yang menjadi bagian dari perjalanan kreatif saya.</p>
        </div>
      </div>
      <div className="shelter-rows" aria-label="Brand dan organisasi">
        <ShelterRow items={firstRow} />
        <ShelterRow items={secondRow} reverse />
      </div>
    </section>
  );
}
