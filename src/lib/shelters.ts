export type Shelter = {
  id: string;
  name: string;
  /** Optional local asset path, e.g. /brands/pens.webp, supplied by the owner. */
  logo?: string;
};

export const shelters: Shelter[] = [
  { id: "pens", name: "PENS" },
  { id: "ent", name: "ENT" },
  { id: "cv-berlian", name: "CV Berlian" },
  { id: "kovari", name: "Kovari" },
  { id: "great-crystal-school", name: "Great Crystal School" },
  { id: "vivo", name: "Vivo" },
  { id: "avian", name: "Avian" },
  { id: "glamoire", name: "Glamoire" },
  { id: "gycora", name: "Gycora" },
  { id: "waroeng-depe", name: "Waroeng Depe" },
  { id: "malaijia", name: "Malaijia" },
  { id: "kecilung", name: "Kecilung" },
];
