export type CategorySlug = "administrativni" | "komercijalni" | "hoteli" | "stanbeni" | "enterieri"

export type Project = {
  slug: string
  title: string
  category: CategorySlug
  location: string
  year: string
  description: string
  images: string[] // first image is the hero
}

export const categories: { slug: CategorySlug; title: string; heroImage: string }[] = [
  { slug: "administrativni", title: "Административни", heroImage: "/category-administrative.jpg" },
  { slug: "komercijalni", title: "Комерцијални", heroImage: "/category-commercial.webp" },
  { slug: "hoteli", title: "Хотели", heroImage: "/category-hotels.jpg" },
  { slug: "stanbeni", title: "Станбени", heroImage: "/category-residential.jpg" },
  {
    slug: "enterieri",
    title: "Ентериери",
    heroImage: "/projects/enterier-caci/edit-6000_result.webp",
  },
]

export const projects: Project[] = [
  {
    slug: "deloven-centar-prilep",
    title: "Деловен центар и катна гаража",
    category: "komercijalni",
    location: "Прилеп",
    year: "2024",
    description:
      "Деловен центар со катна гаража во Прилеп. Проектот ги обединува комерцијалните содржини и решението за паркирање во една кохерентна целина, со чисти линии и рационална организација на просторот.",
    images: [
      "/projects/deloven-centar-prilep/DSC_0492_result.webp",
      "/projects/deloven-centar-prilep/DSC_0493_result.webp",
      "/projects/deloven-centar-prilep/DSC_0494_result.webp",
      "/projects/deloven-centar-prilep/DSC_0495_result.webp",
      "/projects/deloven-centar-prilep/DSC_0496_result.webp",
      "/projects/deloven-centar-prilep/DSC_0497_result.webp",
      "/projects/deloven-centar-prilep/DSC_0498_result.webp",
      "/projects/deloven-centar-prilep/DSC_0499_result.webp",
      "/projects/deloven-centar-prilep/DSC_0500_result.webp",
      "/projects/deloven-centar-prilep/DSC_0501_result.webp",
    ],
  },
  {
    slug: "rekonstrukcija-debarca-20",
    title: "Реконструкција на деловен објект",
    category: "komercijalni",
    location: "Дебарца 20",
    year: "2024",
    description:
      "Реконструкција на постоен деловен објект на ул. Дебарца 20. Интервенцијата го обновува фасадниот израз и внатрешната организација, задржувајќи го карактерот на објектот додека ги усогласува содржините со современите потреби.",
    images: [
      "/projects/rekonstrukcija-debarca-20/01_result.webp",
      "/projects/rekonstrukcija-debarca-20/02_result.webp",
      "/projects/rekonstrukcija-debarca-20/04_result.webp",
      "/projects/rekonstrukcija-debarca-20/05_result.webp",
      "/projects/rekonstrukcija-debarca-20/06_result.webp",
    ],
  },
  {
    slug: "stanbena-zgrada-hrom",
    title: "Станбена зграда",
    category: "stanbeni",
    location: "Хром",
    year: "2024",
    description:
      "Станбена зграда во населбата Хром. Проектот нуди рационални станбени единици со јасна организација и пропорции, осмислени за квалитетен секојдневен живот.",
    images: [
      "/projects/stanbena-zgrada-hrom/layout%20primer%20stan_result.webp",
      "/projects/stanbena-zgrada-hrom/primer%20vtora_result.webp",
    ],
  },
  {
    slug: "individualna-stanbena-bardovci",
    title: "Индивидуална станбена куќа",
    category: "stanbeni",
    location: "Бардовци",
    year: "2024",
    description:
      "Индивидуална станбена куќа во Бардовци. Семеен дом обликуван околу потребите на корисниците, со баланс меѓу приватност, светлина и врска со надворешниот простор.",
    images: ["/projects/stanbena-bardovci/bardovci_result.webp"],
  },
  {
    slug: "individualna-stanbena-cucer-sandevo",
    title: "Индивидуална станбена куќа",
    category: "stanbeni",
    location: "Чучер Сандево",
    year: "2024",
    description:
      "Индивидуална станбена куќа во Чучер Сандево. Куќа всадена во теренот, со архитектура која ја следи конфигурацијата на локацијата и отворања кон околниот пејзаж.",
    images: ["/projects/stanbena-cucer-sandevo/kristina_result.webp"],
  },
  {
    slug: "individualna-stanbena-volkovo",
    title: "Индивидуална станбена куќа",
    category: "stanbeni",
    location: "Волково",
    year: "2024",
    description:
      "Индивидуална станбена куќа во Волково. Современ семеен дом со чисти волумени и внимателно осмислена внатрешна организација.",
    images: [
      "/projects/stanbena-volkovo/viber_image_2024-07-11_19-53-38-168_result.webp",
      "/projects/stanbena-volkovo/viber_image_2024-07-11_19-53-41-080_result.webp",
    ],
  },
  {
    slug: "enterier-caci",
    title: "Ентериер Чачи",
    category: "enterieri",
    location: "Скопје",
    year: "2024",
    description:
      "Ентериерско решение за станбен простор. Дизајнот спојува текстури, светлина и мебел во топла и функционална целина прилагодена на корисниците.",
    images: [
      "/projects/enterier-caci/edit-6000_result.webp",
      "/projects/enterier-caci/12_result.webp",
      "/projects/enterier-caci/23_result.webp",
      "/projects/enterier-caci/31_result.webp",
      "/projects/enterier-caci/38_result.webp",
    ],
  },
  {
    slug: "enterier-apt172",
    title: "Ентериер на стан 172",
    category: "enterieri",
    location: "Скопје",
    year: "2024",
    description:
      "Ентериер на стан со површина прилагодена на современо живеење. Отворената кујна и дневниот простор се поврзани во флуидна целина, со внимание кон детаљот и материјалите.",
    images: [
      "/projects/enterier-apt172/Kujna%20otvorena_result.webp",
      "/projects/enterier-apt172/Spalna%201_result.webp",
      "/projects/enterier-apt172/hf_20260515_023816_944e1593-fd21-4246-9466-14e627073d88_result.webp",
      "/projects/enterier-apt172/hf_20260515_023832_097e5327-369c-4636-961f-8520671b62f8_result.webp",
    ],
  },
  {
    slug: "enterier-cucer",
    title: "Ентериер Чучер",
    category: "enterieri",
    location: "Чучер",
    year: "2024",
    description:
      "Ентериерско решение со фокус на удобност и чисти линии. Просторот е осмислен да понуди мирна и складна атмосфера за секојдневен живот.",
    images: [
      "/projects/enterier-cucer/viber_image_2025-10-11_19-18-58-600_result.webp",
      "/projects/enterier-cucer/viber_image_2025-10-13_10-48-32-520_result.webp",
    ],
  },
]

export function getProjectsByCategory(category: CategorySlug): Project[] {
  return projects.filter((p) => p.category === category)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)
}
